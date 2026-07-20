import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

describe('Q module loading with undefined process.env', () => {
  it('should not throw when process.env is undefined', () => {
    const originalEnv = process.env;
    
    // Temporarily make process.env undefined
    Object.defineProperty(process, 'env', {
      value: undefined,
      configurable: true,
      writable: true
    });
    
    try {
      // Clear module cache and re-require
      jest.resetModules();
      expect(() => require('../../../../../../../../../../../subject_repositories/q/q.js')).not.toThrow();
    } finally {
      Object.defineProperty(process, 'env', {
        value: originalEnv,
        configurable: true,
        writable: true
      });
    }
  });
});