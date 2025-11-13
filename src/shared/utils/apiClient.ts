/**
 * Enhanced API Client with Rate Limiting, Caching, and Error Handling
 * Provides a robust foundation for scalable API interactions
 */

import { supabase } from '@/integrations/supabase/client';
import { apiRateLimiter, authRateLimiter } from './rateLimiter';
import { apiCache } from './cache';

interface APIRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  cache?: boolean;
  cacheTTL?: number;
  retryAttempts?: number;
  retryDelay?: number;
  timeout?: number;
}

interface APIResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
  cached?: boolean;
  remainingRequests?: number;
  resetTime?: number;
}

class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

class APIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL = '', defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders,
    };
  }

  /**
   * Make an API request with built-in rate limiting, caching, and error handling
   */
  async request<T>(
    endpoint: string,
    options: APIRequestOptions = {}
  ): Promise<APIResponse<T>> {
    const {
      method = 'GET',
      headers = {},
      body,
      cache = method === 'GET',
      cacheTTL,
      retryAttempts = 3,
      retryDelay = 1000,
      timeout = 10000,
    } = options;

    // Generate cache key
    const cacheKey = this.generateCacheKey(endpoint, method, body);

    // Check cache for GET requests
    if (cache && method === 'GET') {
      const cached = apiCache.get(cacheKey) as APIResponse<T> | null;
      if (cached) {
        return { ...cached, cached: true };
      }
    }

    // Check rate limiting
    const userId = await this.getUserId();
    const isAuthEndpoint = endpoint.includes('auth') || endpoint.includes('login') || endpoint.includes('signup');
    const limiter = isAuthEndpoint ? authRateLimiter : apiRateLimiter;
    
    if (!limiter.isAllowed(userId)) {
      const resetTime = limiter.getTimeUntilReset(userId);
      throw new APIError(
        'Rate limit exceeded. Please try again later.',
        429,
        'RATE_LIMIT_EXCEEDED'
      );
    }

    // Make the request with retry logic
    let lastError: Error;
    
    for (let attempt = 1; attempt <= retryAttempts; attempt++) {
      try {
        const response = await this.makeRequest<T>(endpoint, {
          method,
          headers: { ...this.defaultHeaders, ...headers },
          body,
          timeout,
        });

        // Cache successful GET requests
        if (cache && method === 'GET' && response.status < 400) {
          apiCache.set(cacheKey, response, cacheTTL);
        }

        // Add rate limiting info to response
        response.remainingRequests = limiter.getRemainingTokens(userId);
        response.resetTime = Date.now() + limiter.getTimeUntilReset(userId);

        return response;

      } catch (error) {
        lastError = error as Error;
        
        // Don't retry for certain errors
        if (error instanceof APIError && (
          error.status === 401 || // Unauthorized
          error.status === 403 || // Forbidden
          error.status === 404 || // Not Found
          error.status === 422    // Validation Error
        )) {
          throw error;
        }

        // Wait before retrying
        if (attempt < retryAttempts) {
          await this.delay(retryDelay * Math.pow(2, attempt - 1)); // Exponential backoff
        }
      }
    }

    throw lastError!;
  }

  /**
   * Supabase-specific methods with enhanced error handling
   */
  async supabaseQuery<T>(
    operation: () => Promise<{ data: T | null; error: unknown }>
  ): Promise<APIResponse<T>> {
    try {
      const { data, error } = await operation();
      
      if (error) {
        const errorObj = error as { message?: string; status?: number; code?: string };
        throw new APIError(
          errorObj.message || 'Database operation failed',
          errorObj.status || 500,
          errorObj.code
        );
      }

      return {
        data,
        error: null,
        status: 200,
      };

    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      throw new APIError(
        'An unexpected error occurred',
        500,
        'INTERNAL_ERROR'
      );
    }
  }

  /**
   * Batch multiple requests with concurrency control
   */
  async batchRequests<T>(
    requests: Array<{ endpoint: string; options?: APIRequestOptions }>,
    concurrency = 5
  ): Promise<Array<APIResponse<T>>> {
    const results: Array<APIResponse<T>> = [];
    
    for (let i = 0; i < requests.length; i += concurrency) {
      const batch = requests.slice(i, i + concurrency);
      
      const batchPromises = batch.map(({ endpoint, options }) =>
        this.request<T>(endpoint, options).catch(error => ({
          data: null,
          error: error.message,
          status: error.status || 500,
        }))
      );

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }

    return results;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: {
      method: string;
      headers: Record<string, string>;
      body?: unknown;
      timeout: number;
    }
  ): Promise<APIResponse<T>> {
    const url = this.baseURL ? `${this.baseURL}${endpoint}` : endpoint;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout);

    try {
      const response = await fetch(url, {
        method: options.method,
        headers: options.headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      let data: T | null = null;
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      }

      if (!response.ok) {
        throw new APIError(
          (data as { message?: string })?.message || `Request failed with status ${response.status}`,
          response.status
        );
      }

      return {
        data,
        error: null,
        status: response.status,
      };

    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof APIError) {
        throw error;
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new APIError('Request timeout', 408, 'TIMEOUT');
      }

      throw new APIError('Network error occurred', 0, 'NETWORK_ERROR');
    }
  }

  private generateCacheKey(endpoint: string, method: string, body?: unknown): string {
    const bodyHash = body ? btoa(JSON.stringify(body)).slice(0, 8) : '';
    return `${method}:${endpoint}:${bodyHash}`;
  }

  private async getUserId(): Promise<string> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user?.id || 'anonymous';
    } catch {
      return 'anonymous';
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Create default API client instance
export const apiClient = new APIClient();

// Export types and classes
export { APIClient, APIError };
export type { APIRequestOptions, APIResponse };