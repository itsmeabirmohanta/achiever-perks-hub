/**
 * Rate Limiter Utility for Client-Side Rate Limiting
 * Implements token bucket algorithm for API request rate limiting
 */

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  keyGenerator?: (identifier: string) => string;
}

interface TokenBucket {
  tokens: number;
  lastRefill: number;
  maxTokens: number;
  refillRate: number;
}

class RateLimiter {
  private buckets = new Map<string, TokenBucket>();
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
    
    // Clean up expired buckets every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Check if request is allowed for given identifier
   */
  isAllowed(identifier: string): boolean {
    const key = this.config.keyGenerator ? this.config.keyGenerator(identifier) : identifier;
    const bucket = this.getBucket(key);
    
    this.refillBucket(bucket);
    
    if (bucket.tokens >= 1) {
      bucket.tokens -= 1;
      return true;
    }
    
    return false;
  }

  /**
   * Get remaining tokens for identifier
   */
  getRemainingTokens(identifier: string): number {
    const key = this.config.keyGenerator ? this.config.keyGenerator(identifier) : identifier;
    const bucket = this.getBucket(key);
    this.refillBucket(bucket);
    return Math.floor(bucket.tokens);
  }

  /**
   * Get time until next token is available (in ms)
   */
  getTimeUntilReset(identifier: string): number {
    const key = this.config.keyGenerator ? this.config.keyGenerator(identifier) : identifier;
    const bucket = this.getBucket(key);
    
    if (bucket.tokens >= 1) return 0;
    
    const timeSinceLastRefill = Date.now() - bucket.lastRefill;
    const timeUntilNextToken = (1000 / bucket.refillRate) - timeSinceLastRefill;
    
    return Math.max(0, timeUntilNextToken);
  }

  private getBucket(key: string): TokenBucket {
    if (!this.buckets.has(key)) {
      this.buckets.set(key, {
        tokens: this.config.maxRequests,
        lastRefill: Date.now(),
        maxTokens: this.config.maxRequests,
        refillRate: this.config.maxRequests / (this.config.windowMs / 1000) // tokens per second
      });
    }
    
    return this.buckets.get(key)!;
  }

  private refillBucket(bucket: TokenBucket): void {
    const now = Date.now();
    const timePassed = now - bucket.lastRefill;
    const tokensToAdd = (timePassed / 1000) * bucket.refillRate;
    
    bucket.tokens = Math.min(bucket.maxTokens, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;
  }

  private cleanup(): void {
    const cutoff = Date.now() - this.config.windowMs * 2; // Keep buckets for 2x window time
    
    for (const [key, bucket] of this.buckets.entries()) {
      if (bucket.lastRefill < cutoff) {
        this.buckets.delete(key);
      }
    }
  }
}

// Pre-configured rate limiters for different use cases
export const apiRateLimiter = new RateLimiter({
  maxRequests: 100, // 100 requests
  windowMs: 15 * 60 * 1000, // per 15 minutes
});

export const authRateLimiter = new RateLimiter({
  maxRequests: 5, // 5 attempts  
  windowMs: 15 * 60 * 1000, // per 15 minutes
});

export const searchRateLimiter = new RateLimiter({
  maxRequests: 30, // 30 searches
  windowMs: 60 * 1000, // per minute
});

export const uploadRateLimiter = new RateLimiter({
  maxRequests: 10, // 10 uploads
  windowMs: 60 * 1000, // per minute
});

export { RateLimiter };
export type { RateLimitConfig };