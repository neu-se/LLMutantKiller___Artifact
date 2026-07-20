describe('Complex.js AMD module loading', () => {
  it('should call define with a factory function that returns Complex when AMD is available', () => {
    const originalDefine = (global as any).define;
    const originalModule = (global as any).module;
    const originalExports = (global as any).exports;

    try {
      // Remove CommonJS to force AMD path
      delete (global as any).module;
      delete (global as any).exports;

      let defineCallCount = 0;
      let factoryResult: any = undefined;

      const mockDefine = function(deps: any, factory: any) {
        defineCallCount++;
        if (typeof factory === 'function') {
          factoryResult = factory();
        }
      };
      (mockDefine as any).amd = {};

      (global as any).define = mockDefine;

      // Clear require cache to force re-evaluation
      const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');
      delete require.cache[modulePath];

      require('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');

      // Original: define is called once with a factory returning Complex
      // Mutated: define is never called (empty block)
      expect(defineCallCount).toBe(1);
      expect(factoryResult).toBeDefined();
      expect(typeof factoryResult).toBe('function');

      // Verify the factory returns a working Complex constructor
      const ComplexFromFactory = factoryResult;
      const c = new ComplexFromFactory(3, 4);
      expect(c.re).toBe(3);
      expect(c.im).toBe(4);

    } finally {
      if (originalDefine !== undefined) {
        (global as any).define = originalDefine;
      } else {
        delete (global as any).define;
      }
      if (originalModule !== undefined) {
        (global as any).module = originalModule;
      } else {
        delete (global as any).module;
      }
      if (originalExports !== undefined) {
        (global as any).exports = originalExports;
      } else {
        delete (global as any).exports;
      }

      const modulePath = require.resolve('../../../../../../../../../../../subject_repositories/Complex.js/complex.js');
      delete require.cache[modulePath];
    }
  });
});