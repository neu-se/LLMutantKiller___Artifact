import { describe, it, expect } from '@jest/globals';

describe('Complex.js AMD module export', () => {
  it('should call define with an empty array and a factory function that returns Complex when AMD is available', () => {
    // Save original module state
    const originalDefine = (global as any).define;
    const originalModule = (global as any).module;
    const originalExports = (global as any).exports;

    let defineCalled = false;
    let defineArgs: any[] = [];
    let factoryResult: any = undefined;

    // Set up AMD environment
    const mockDefine = function(...args: any[]) {
      defineCalled = true;
      defineArgs = args;
      // Call the factory function if provided
      if (typeof args[1] === 'function') {
        factoryResult = args[1]();
      }
    };
    (mockDefine as any)['amd'] = {};

    // Remove CommonJS exports to force AMD path
    (global as any).define = mockDefine;
    delete (global as any).module;
    delete (global as any).exports;

    // Clear require cache to force re-evaluation
    const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');
    delete require.cache[modulePath];

    try {
      require('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');

      // In original code: define should be called with [] and a factory function
      // In mutated code: define is never called (empty block)
      expect(defineCalled).toBe(true);
      expect(Array.isArray(defineArgs[0])).toBe(true);
      expect(defineArgs[0]).toHaveLength(0);
      expect(typeof defineArgs[1]).toBe('function');
      expect(factoryResult).toBeDefined();
      expect(typeof factoryResult).toBe('function');
    } finally {
      // Restore original state
      if (originalDefine !== undefined) {
        (global as any).define = originalDefine;
      } else {
        delete (global as any).define;
      }
      if (originalModule !== undefined) {
        (global as any).module = originalModule;
      }
      if (originalExports !== undefined) {
        (global as any).exports = originalExports;
      }

      // Clean up require cache
      delete require.cache[modulePath];
    }
  });
});