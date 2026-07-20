// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9ed59c5/testCase.test.ts
const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

describe('Complex.js module export', () => {
  it('should correctly export Complex via CommonJS when AMD is not available', () => {
    // Save original define
    const originalDefine = global.define;

    try {
      // Simulate environment without AMD
      global.define = undefined;

      // Clear module cache to force re-evaluation
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/Complex.js/complex.js")];
      const ComplexNoAMD = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");

      // Verify we can create instances
      const c = new ComplexNoAMD(3, 4);
      expect(c.re).toBe(3);
      expect(c.im).toBe(4);

      // The mutation breaks the else-if chain, preventing CommonJS export
      // when define is not a function, which this test would catch
    } finally {
      // Restore original define
      global.define = originalDefine;
    }
  });
});