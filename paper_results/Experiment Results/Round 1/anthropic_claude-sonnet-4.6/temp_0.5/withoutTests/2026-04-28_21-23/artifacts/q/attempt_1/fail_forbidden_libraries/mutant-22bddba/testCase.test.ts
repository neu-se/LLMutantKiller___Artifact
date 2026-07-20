import { describe, it, expect } from '@jest/globals';

describe('Q module window/self detection', () => {
  it('should use window global when window is defined but self is not', () => {
    // Save original state
    const originalWindow = (global as any).window;
    const originalSelf = (global as any).self;
    const originalModule = (global as any).module;
    const originalExports = (global as any).exports;
    
    try {
      // Simulate browser-like environment where window exists but self doesn't
      // and CommonJS is not available
      delete (global as any).module;
      delete (global as any).exports;
      (global as any).window = {};
      delete (global as any).self;
      
      // Clear require cache to force re-evaluation
      delete require.cache[require.resolve('../../../../../../../../../../../subject_repositories/q/q.js')];
      
      require('../../../../../../../../../../../subject_repositories/q/q.js');
      
      // In original code: window is defined, so Q should be set on window
      // In mutated code: false || (self is undefined) = false, so this branch is skipped
      expect((global as any).window.Q).toBeDefined();
    } finally {
      // Restore
      (global as any).module = originalModule;
      (global as any).exports = originalExports;
      if (originalWindow === undefined) delete (global as any).window;
      else (global as any).window = originalWindow;
      if (originalSelf === undefined) delete (global as any).self;
      else (global as any).self = originalSelf;
      delete require.cache[require.resolve('../../../../../../../../../../../subject_repositories/q/q.js')];
    }
  });
});