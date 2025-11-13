/**
 * Advanced Caching Utility for Performance Optimization
 * Supports multiple cache strategies and automatic cleanup
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
}

interface CacheConfig {
  defaultTTL?: number; // Time to live in milliseconds
  maxSize?: number;    // Maximum number of entries
  cleanupInterval?: number; // Cleanup interval in milliseconds
}

class Cache<T = unknown> {
  private cache = new Map<string, CacheEntry<T>>();
  private config: Required<CacheConfig>;
  private cleanupTimer?: NodeJS.Timeout;

  constructor(config: CacheConfig = {}) {
    this.config = {
      defaultTTL: config.defaultTTL || 5 * 60 * 1000, // 5 minutes
      maxSize: config.maxSize || 1000,
      cleanupInterval: config.cleanupInterval || 60 * 1000, // 1 minute
    };

    this.startCleanup();
  }

  /**
   * Set a value in the cache
   */
  set(key: string, value: T, ttl?: number): void {
    // Remove oldest entries if cache is full
    if (this.cache.size >= this.config.maxSize) {
      this.evictLRU();
    }

    const now = Date.now();
    this.cache.set(key, {
      data: value,
      timestamp: now,
      ttl: ttl || this.config.defaultTTL,
      accessCount: 0,
      lastAccessed: now,
    });
  }

  /**
   * Get a value from the cache
   */
  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    const now = Date.now();
    
    // Check if entry has expired
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = now;
    
    return entry.data;
  }

  /**
   * Check if a key exists in the cache
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Delete a specific key from the cache
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all entries from the cache
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    const now = Date.now();
    let totalSize = 0;
    let expiredCount = 0;
    let totalAccesses = 0;

    for (const entry of this.cache.values()) {
      totalSize++;
      totalAccesses += entry.accessCount;
      
      if (now - entry.timestamp > entry.ttl) {
        expiredCount++;
      }
    }

    return {
      size: totalSize,
      maxSize: this.config.maxSize,
      expiredCount,
      totalAccesses,
      hitRate: totalAccesses / (totalAccesses + expiredCount) || 0,
    };
  }

  /**
   * Get or set pattern - if key exists, return it, otherwise set and return new value
   */
  async getOrSet(key: string, factory: () => T | Promise<T>, ttl?: number): Promise<T> {
    const cached = this.get(key);
    if (cached !== null) {
      return cached;
    }

    const value = await factory();
    this.set(key, value, ttl);
    return value;
  }

  /**
   * Evict least recently used entries
   */
  private evictLRU(): void {
    let oldestKey = '';
    let oldestTime = Date.now();

    for (const [key, entry] of this.cache.entries()) {
      if (entry.lastAccessed < oldestTime) {
        oldestTime = entry.lastAccessed;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
    }
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, entry] of this.cache.entries()) {
      if (now - entry.timestamp > entry.ttl) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * Start automatic cleanup
   */
  private startCleanup(): void {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupInterval);
  }

  /**
   * Stop automatic cleanup
   */
  destroy(): void {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
    }
    this.clear();
  }
}

// Pre-configured caches for different use cases
export const apiCache = new Cache({
  defaultTTL: 5 * 60 * 1000, // 5 minutes for API responses
  maxSize: 500,
});

export const userCache = new Cache({
  defaultTTL: 15 * 60 * 1000, // 15 minutes for user data
  maxSize: 100,
});

export const staticCache = new Cache({
  defaultTTL: 60 * 60 * 1000, // 1 hour for static content
  maxSize: 200,
});

export const searchCache = new Cache({
  defaultTTL: 10 * 60 * 1000, // 10 minutes for search results
  maxSize: 300,
});

export { Cache };
export type { CacheConfig };