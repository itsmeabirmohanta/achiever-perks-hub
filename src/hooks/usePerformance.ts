/**
 * React hooks for performance monitoring and optimization
 */

import { useCallback, useEffect, useState } from 'react';
import { performanceMonitor } from '@/shared/utils/performanceMonitor';
import { apiClient } from '@/shared/utils/apiClient';

/**
 * Hook to track component render performance
 */
export function usePerformanceTracking(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      performanceMonitor.recordMetric(
        `${componentName}_render_time`,
        endTime - startTime,
        { component: componentName }
      );
    };
  });

  const trackInteraction = useCallback((action: string, element?: string) => {
    performanceMonitor.recordInteraction(action, element || componentName);
  }, [componentName]);

  return { trackInteraction };
}

/**
 * Hook for tracking API call performance
 */
export function useAPIPerformance() {
  const [stats, setStats] = useState({
    totalCalls: 0,
    averageResponseTime: 0,
    errorRate: 0,
  });

  const trackAPICall = useCallback(async <T>(
    apiCall: () => Promise<T>,
    endpoint: string
  ): Promise<T> => {
    const start = performance.now();
    
    try {
      const result = await apiCall();
      const duration = performance.now() - start;
      
      performanceMonitor.recordMetric('api_call_success', duration, { endpoint });
      
      setStats(prev => ({
        totalCalls: prev.totalCalls + 1,
        averageResponseTime: (prev.averageResponseTime + duration) / 2,
        errorRate: prev.errorRate,
      }));
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      
      performanceMonitor.recordMetric('api_call_error', duration, { endpoint });
      
      setStats(prev => ({
        totalCalls: prev.totalCalls + 1,
        averageResponseTime: (prev.averageResponseTime + duration) / 2,
        errorRate: (prev.errorRate + 1) / prev.totalCalls,
      }));
      
      throw error;
    }
  }, []);

  return { trackAPICall, stats };
}

/**
 * Hook for memory usage monitoring
 */
export function useMemoryMonitoring() {
  const [memoryStats, setMemoryStats] = useState<{
    usedJSHeapSize?: number;
    totalJSHeapSize?: number;
    jsHeapSizeLimit?: number;
  }>({});

  useEffect(() => {
    const updateMemoryStats = () => {
      if ('memory' in performance) {
        const memory = (performance as { memory?: {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
          jsHeapSizeLimit: number;
        }}).memory;
        
        if (memory) {
          setMemoryStats({
            usedJSHeapSize: memory.usedJSHeapSize / (1024 * 1024), // Convert to MB
            totalJSHeapSize: memory.totalJSHeapSize / (1024 * 1024),
            jsHeapSizeLimit: memory.jsHeapSizeLimit / (1024 * 1024),
          });
        }
      }
    };

    updateMemoryStats();
    const interval = setInterval(updateMemoryStats, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return memoryStats;
}

/**
 * Hook for rate limiting awareness
 */
export function useRateLimiting() {
  const [rateLimitStatus, setRateLimitStatus] = useState({
    remaining: 100,
    resetTime: 0,
    limited: false,
  });

  const makeRateLimitedRequest = useCallback(async <T>(
    request: () => Promise<T>
  ): Promise<T> => {
    try {
      const response = await apiClient.request<T>('', {
        method: 'GET',
        cache: false,
      });

      setRateLimitStatus({
        remaining: response.remainingRequests || 100,
        resetTime: response.resetTime || 0,
        limited: false,
      });

      return response.data!;
    } catch (error) {
      if (error instanceof Error && error.message.includes('Rate limit')) {
        setRateLimitStatus(prev => ({
          ...prev,
          limited: true,
        }));
      }
      throw error;
    }
  }, []);

  return { rateLimitStatus, makeRateLimitedRequest };
}

/**
 * Hook for lazy loading optimization
 */
export function useLazyLoading<T>(
  loader: () => Promise<T>,
  dependencies: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const load = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await performanceMonitor.measureAsync(
        'lazy_load',
        loader
      );
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [loader, loading]);

  useEffect(() => {
    load();
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error, reload: load };
}

/**
 * Hook for connection quality monitoring
 */
export function useConnectionQuality() {
  const [connectionInfo, setConnectionInfo] = useState({
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0,
    saveData: false,
  });

  useEffect(() => {
    const updateConnectionInfo = () => {
      if ('connection' in navigator) {
        const connection = (navigator as { connection?: {
          effectiveType?: string;
          downlink?: number;
          rtt?: number;
          saveData?: boolean;
        }}).connection;
        
        if (connection) {
          setConnectionInfo({
            effectiveType: connection.effectiveType || 'unknown',
            downlink: connection.downlink || 0,
            rtt: connection.rtt || 0,
            saveData: connection.saveData || false,
          });
        }
      }
    };

    updateConnectionInfo();
    
    if ('connection' in navigator) {
      const connection = (navigator as { connection?: EventTarget }).connection;
      connection?.addEventListener('change', updateConnectionInfo);
      
      return () => connection?.removeEventListener('change', updateConnectionInfo);
    }
  }, []);

  const isSlowConnection = connectionInfo.effectiveType === 'slow-2g' || 
                          connectionInfo.effectiveType === '2g' ||
                          connectionInfo.rtt > 1000;

  return { ...connectionInfo, isSlowConnection };
}