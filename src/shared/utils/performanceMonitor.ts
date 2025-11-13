/**
 * Performance Monitoring and Analytics Utility
 * Tracks application performance metrics and user interactions
 */

interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  tags?: Record<string, string | number>;
}

interface UserInteraction {
  action: string;
  element?: string;
  page: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
}

interface PageLoadMetric {
  url: string;
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  cumulativeLayoutShift?: number;
  firstInputDelay?: number;
  timestamp: number;
}

class PerformanceMonitor {
  private metrics: PerformanceMetric[] = [];
  private interactions: UserInteraction[] = [];
  private pageLoads: PageLoadMetric[] = [];
  private sessionId: string;
  private startTime: number;
  private observer?: PerformanceObserver;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = performance.now();
    this.setupPerformanceObserver();
    this.setupPageLoadTracking();
    this.setupErrorTracking();
  }

  /**
   * Record a custom performance metric
   */
  recordMetric(name: string, value: number, tags?: Record<string, string | number>): void {
    this.metrics.push({
      name,
      value,
      timestamp: Date.now(),
      tags,
    });

    // Keep only last 1000 metrics to prevent memory issues
    if (this.metrics.length > 1000) {
      this.metrics = this.metrics.slice(-1000);
    }
  }

  /**
   * Record user interaction
   */
  recordInteraction(action: string, element?: string): void {
    this.interactions.push({
      action,
      element,
      page: window.location.pathname,
      timestamp: Date.now(),
      sessionId: this.sessionId,
    });

    // Keep only last 500 interactions
    if (this.interactions.length > 500) {
      this.interactions = this.interactions.slice(-500);
    }
  }

  /**
   * Measure function execution time
   */
  async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    try {
      const result = await fn();
      const duration = performance.now() - start;
      this.recordMetric(`${name}_duration`, duration, { status: 'success' });
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${name}_duration`, duration, { status: 'error' });
      throw error;
    }
  }

  /**
   * Measure synchronous function execution time
   */
  measure<T>(name: string, fn: () => T): T {
    const start = performance.now();
    try {
      const result = fn();
      const duration = performance.now() - start;
      this.recordMetric(`${name}_duration`, duration, { status: 'success' });
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      this.recordMetric(`${name}_duration`, duration, { status: 'error' });
      throw error;
    }
  }

  /**
   * Get performance statistics
   */
  getStats(): {
    sessionDuration: number;
    totalInteractions: number;
    averagePageLoadTime: number;
    errorRate: number;
    memoryUsage?: number;
  } {
    const sessionDuration = performance.now() - this.startTime;
    const totalInteractions = this.interactions.length;
    
    const avgPageLoadTime = this.pageLoads.length > 0
      ? this.pageLoads.reduce((sum, load) => sum + load.loadTime, 0) / this.pageLoads.length
      : 0;

    const errorMetrics = this.metrics.filter(m => m.tags?.status === 'error');
    const totalMetrics = this.metrics.length;
    const errorRate = totalMetrics > 0 ? errorMetrics.length / totalMetrics : 0;

    let memoryUsage: number | undefined;
    if ('memory' in performance) {
      const mem = (performance as { memory?: { usedJSHeapSize: number } }).memory;
      if (mem) {
        memoryUsage = mem.usedJSHeapSize / (1024 * 1024); // MB
      }
    }

    return {
      sessionDuration,
      totalInteractions,
      averagePageLoadTime: avgPageLoadTime,
      errorRate,
      memoryUsage,
    };
  }

  /**
   * Get Core Web Vitals
   */
  getCoreWebVitals(): {
    lcp?: number; // Largest Contentful Paint
    fid?: number; // First Input Delay
    cls?: number; // Cumulative Layout Shift
  } {
    const latest = this.pageLoads[this.pageLoads.length - 1];
    if (!latest) return {};

    return {
      lcp: latest.largestContentfulPaint,
      fid: latest.firstInputDelay,
      cls: latest.cumulativeLayoutShift,
    };
  }

  /**
   * Export performance data for analysis
   */
  exportData(): {
    session: string;
    metrics: PerformanceMetric[];
    interactions: UserInteraction[];
    pageLoads: PageLoadMetric[];
    stats: ReturnType<typeof this.getStats>;
  } {
    return {
      session: this.sessionId,
      metrics: [...this.metrics],
      interactions: [...this.interactions],
      pageLoads: [...this.pageLoads],
      stats: this.getStats(),
    };
  }

  /**
   * Send performance data to analytics endpoint
   */
  async sendAnalytics(endpoint?: string): Promise<void> {
    if (!endpoint) return;

    try {
      const data = this.exportData();
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.warn('Failed to send performance analytics:', error);
    }
  }

  private setupPerformanceObserver(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'paint') {
            this.recordMetric(entry.name.replace('-', '_'), entry.startTime);
          } else if (entry.entryType === 'layout-shift') {
            const layoutShiftEntry = entry as PerformanceEntry & { value?: number };
            if (layoutShiftEntry.value !== undefined) {
              this.recordMetric('layout_shift', layoutShiftEntry.value);
            }
          }
        }
      });

      this.observer.observe({ entryTypes: ['paint', 'layout-shift'] });
    } catch (error) {
      console.warn('Performance observer setup failed:', error);
    }
  }

  private setupPageLoadTracking(): void {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        this.pageLoads.push({
          url: window.location.href,
          loadTime: navigation.loadEventEnd - navigation.fetchStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          firstContentfulPaint: this.getMetricValue('first-contentful-paint'),
          largestContentfulPaint: this.getMetricValue('largest-contentful-paint'),
          timestamp: Date.now(),
        });
      }, 0);
    });
  }

  private setupErrorTracking(): void {
    window.addEventListener('error', (event) => {
      this.recordMetric('javascript_error', 1, {
        message: event.message,
        filename: event.filename,
        line: event.lineno,
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.recordMetric('unhandled_promise_rejection', 1, {
        reason: String(event.reason),
      });
    });
  }

  private getMetricValue(name: string): number | undefined {
    const metric = this.metrics.find(m => m.name === name.replace('-', '_'));
    return metric?.value;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Create global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Automatically track common interactions
if (typeof window !== 'undefined') {
  // Track button clicks
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
      performanceMonitor.recordInteraction('click', target.textContent?.trim() || 'button');
    }
  });

  // Track form submissions
  document.addEventListener('submit', (event) => {
    const target = event.target as HTMLFormElement;
    performanceMonitor.recordInteraction('form_submit', target.name || 'form');
  });

  // Track navigation
  let currentUrl = window.location.href;
  new MutationObserver(() => {
    if (window.location.href !== currentUrl) {
      performanceMonitor.recordInteraction('navigation', window.location.pathname);
      currentUrl = window.location.href;
    }
  }).observe(document, { subtree: true, childList: true });
}

export { PerformanceMonitor };
export type { PerformanceMetric, UserInteraction, PageLoadMetric };