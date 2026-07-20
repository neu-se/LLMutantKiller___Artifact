// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe('Complex.js export behavior', () => {
  it('should export Complex class when define is not available', () => {
    // Create a fresh context to test module loading
    const vm = require('vm');
    const Module = require('module');
    const originalRequire = Module.prototype.require;

    // Mock a fresh require context
    const mockRequire = (path) => {
      if (path === "../../../../../../../../../../../subject_repositories/Complex.js/complex.js") {
        // Execute the module in a context where define doesn't exist
        const context = {
          module: { exports: {} },
          exports: {},
          define: undefined,
          require: originalRequire
        };
        vm.runInNewContext(
          `(function(module, exports, require) {
            ${require('fs').readFileSync("../../../../../../../../../../../subject_repositories/Complex.js/complex.js", 'utf8')}
          })(module, exports, require);`,
          context
        );
        return context.module.exports;
      }
      return originalRequire.apply(this, arguments);
    };

    // The mutation breaks the else-if chain when define is not available
    // This should fail on mutated code because the export won't happen
    const TestComplex = mockRequire("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    expect(TestComplex).toBeDefined();
    expect(new TestComplex(1, 1).re).toBe(1);
  });
});