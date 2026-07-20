import { describe, it, expect } from '@jest/globals';

describe('Q module loading with process.env manipulation', () => {
  it('should not throw when process.env is undefined during module initialization', () => {
    const originalEnv = process.env;
    // @ts-ignore
    delete process.env;
    
    expect(() => {
      // Re-require the module
      jest.resetModules();
      require('../../../../../../../../../../../subject_repositories/q/q.js');
    }).not.toThrow();
    
    process.env = originalEnv;
  });
});