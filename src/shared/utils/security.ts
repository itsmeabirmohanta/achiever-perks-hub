/**
 * Security Utilities for Application Protection
 * Includes input sanitization, XSS protection, and security headers
 */

/**
 * Input sanitization and validation utilities
 */
export class InputSanitizer {
  private static readonly XSS_PATTERNS = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe\b[^>]*>/gi,
    /<object\b[^>]*>/gi,
    /<embed\b[^>]*>/gi,
    /<link\b[^>]*>/gi,
    /<meta\b[^>]*>/gi,
  ];

  private static readonly SQL_INJECTION_PATTERNS = [
    /(%27)|(')|(--)|(%23)|(#)/gi,
    /((%3D)|(=))[^\n]*((%27)|(')|(--)|(%23)|(#))/gi,
    /union.+(select|all|distinct)/gi,
    /(select|insert|update|delete|drop|create|alter|exec|execute)/gi,
  ];

  /**
   * Sanitize HTML content to prevent XSS attacks
   */
  static sanitizeHTML(input: string): string {
    if (!input || typeof input !== 'string') return '';
    
    let sanitized = input;
    
    // Remove dangerous HTML tags and attributes
    this.XSS_PATTERNS.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '');
    });

    // Encode special characters
    sanitized = sanitized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');

    return sanitized;
  }

  /**
   * Validate and sanitize SQL input
   */
  static sanitizeSQL(input: string): string {
    if (!input || typeof input !== 'string') return '';
    
    let sanitized = input.trim();
    
    // Check for SQL injection patterns
    this.SQL_INJECTION_PATTERNS.forEach(pattern => {
      if (pattern.test(sanitized)) {
        throw new Error('Potentially malicious SQL detected');
      }
    });

    // Escape single quotes
    sanitized = sanitized.replace(/'/g, "''");
    
    return sanitized;
  }

  /**
   * Sanitize email input
   */
  static sanitizeEmail(email: string): string {
    if (!email || typeof email !== 'string') return '';
    
    const sanitized = email.toLowerCase().trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (!emailRegex.test(sanitized)) {
      throw new Error('Invalid email format');
    }
    
    return sanitized;
  }

  /**
   * Sanitize phone number
   */
  static sanitizePhone(phone: string): string {
    if (!phone || typeof phone !== 'string') return '';
    
    // Remove all non-numeric characters except + at the beginning
    const sanitized = phone.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
    
    // Basic phone number validation (10-15 digits, optional + prefix)
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    
    if (!phoneRegex.test(sanitized)) {
      throw new Error('Invalid phone number format');
    }
    
    return sanitized;
  }

  /**
   * Validate and sanitize URLs
   */
  static sanitizeURL(url: string): string {
    if (!url || typeof url !== 'string') return '';
    
    try {
      const parsed = new URL(url);
      
      // Only allow http and https protocols
      if (!['http:', 'https:'].includes(parsed.protocol)) {
        throw new Error('Invalid URL protocol');
      }
      
      return parsed.toString();
    } catch {
      throw new Error('Invalid URL format');
    }
  }

  /**
   * Generic input validation with length and pattern constraints
   */
  static validateInput(
    input: string,
    options: {
      minLength?: number;
      maxLength?: number;
      pattern?: RegExp;
      allowedChars?: RegExp;
    } = {}
  ): string {
    if (!input || typeof input !== 'string') {
      throw new Error('Input is required and must be a string');
    }

    const {
      minLength = 0,
      maxLength = 10000,
      pattern,
      allowedChars
    } = options;

    // Check length constraints
    if (input.length < minLength) {
      throw new Error(`Input must be at least ${minLength} characters long`);
    }

    if (input.length > maxLength) {
      throw new Error(`Input must not exceed ${maxLength} characters`);
    }

    // Check pattern if provided
    if (pattern && !pattern.test(input)) {
      throw new Error('Input does not match required pattern');
    }

    // Check allowed characters if provided
    if (allowedChars && !allowedChars.test(input)) {
      throw new Error('Input contains invalid characters');
    }

    return input;
  }
}

/**
 * Content Security Policy utilities
 */
export class CSPManager {
  private static readonly DEFAULT_DIRECTIVES = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'"],
    'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    'font-src': ["'self'", 'https://fonts.gstatic.com'],
    'img-src': ["'self'", 'data:', 'https:'],
    'connect-src': ["'self'", 'https://api.supabase.co', 'wss://realtime.supabase.co'],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
  };

  /**
   * Generate CSP header value
   */
  static generateCSPHeader(customDirectives: Record<string, string[]> = {}): string {
    const directives = { ...this.DEFAULT_DIRECTIVES, ...customDirectives };
    
    return Object.entries(directives)
      .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
      .join('; ');
  }

  /**
   * Apply CSP to the current page
   */
  static applyCSP(customDirectives?: Record<string, string[]>): void {
    if (typeof document === 'undefined') return;

    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = this.generateCSPHeader(customDirectives);
    
    document.head.appendChild(meta);
  }
}

/**
 * Authentication and session security utilities
 */
export class SecurityManager {
  private static readonly TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes

  /**
   * Generate secure random string
   */
  static generateSecureToken(length = 32): string {
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const array = new Uint8Array(length);
      crypto.getRandomValues(array);
      return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
    }
    
    // Fallback for environments without crypto.getRandomValues
    return Array.from({ length }, () => Math.random().toString(36)[2]).join('');
  }

  /**
   * Validate password strength
   */
  static validatePasswordStrength(password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length < 8) {
      feedback.push('Password must be at least 8 characters long');
    } else {
      score += 1;
    }

    if (!/[a-z]/.test(password)) {
      feedback.push('Password must contain at least one lowercase letter');
    } else {
      score += 1;
    }

    if (!/[A-Z]/.test(password)) {
      feedback.push('Password must contain at least one uppercase letter');
    } else {
      score += 1;
    }

    if (!/\d/.test(password)) {
      feedback.push('Password must contain at least one number');
    } else {
      score += 1;
    }

    if (!/[!@#$%^&*()_+=[\]{};':"\\|,.<>?-]/.test(password)) {
      feedback.push('Password must contain at least one special character');
    } else {
      score += 1;
    }

    // Check for common patterns
    if (/(.)\1{2,}/.test(password)) {
      feedback.push('Password should not contain repeated characters');
      score -= 1;
    }

    if (/123|abc|qwe|password/i.test(password)) {
      feedback.push('Password should not contain common patterns');
      score -= 1;
    }

    return {
      isValid: score >= 4 && feedback.length === 0,
      score: Math.max(0, Math.min(5, score)),
      feedback,
    };
  }

  /**
   * Secure local storage wrapper
   */
  static secureStorage = {
    setItem(key: string, value: string, encrypt = false): void {
      try {
        const item = {
          value: encrypt ? btoa(value) : value,
          timestamp: Date.now(),
          encrypted: encrypt,
        };
        localStorage.setItem(key, JSON.stringify(item));
      } catch (error) {
        console.error('Failed to store item securely:', error);
      }
    },

    getItem(key: string): string | null {
      try {
        const item = localStorage.getItem(key);
        if (!item) return null;

        const parsed = JSON.parse(item);
        
        // Simple decryption if encrypted
        if (parsed.encrypted && parsed.value) {
          return atob(parsed.value);
        }
        
        return parsed.value || null;
      } catch (error) {
        console.error('Failed to retrieve item securely:', error);
        return null;
      }
    },

    removeItem(key: string): void {
      localStorage.removeItem(key);
    },

    clear(): void {
      localStorage.clear();
    }
  };

  /**
   * Check if user session should be refreshed
   */
  static shouldRefreshSession(lastActivity: number): boolean {
    return Date.now() - lastActivity > this.TOKEN_REFRESH_THRESHOLD;
  }

  /**
   * Detect suspicious activity patterns
   */
  static detectSuspiciousActivity(activities: Array<{ timestamp: number; action: string }>): boolean {
    if (activities.length < 2) return false;

    const recentActivities = activities.filter(
      activity => Date.now() - activity.timestamp < 60000 // Last minute
    );

    // Too many actions in short time
    if (recentActivities.length > 50) return true;

    // Check for repeated failed login attempts
    const failedLogins = recentActivities.filter(
      activity => activity.action === 'login_failed'
    );

    if (failedLogins.length > 5) return true;

    return false;
  }
}

// Export security middleware for API requests
export const securityMiddleware = {
  /**
   * Add security headers to requests
   */
  addSecurityHeaders(headers: Record<string, string> = {}): Record<string, string> {
    return {
      ...headers,
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    };
  },

  /**
   * Validate request origin
   */
  validateOrigin(origin: string, allowedOrigins: string[]): boolean {
    return allowedOrigins.some(allowed => {
      if (allowed === '*') return true;
      if (allowed.startsWith('*.')) {
        const domain = allowed.slice(2);
        return origin.endsWith(domain);
      }
      return origin === allowed;
    });
  },
};