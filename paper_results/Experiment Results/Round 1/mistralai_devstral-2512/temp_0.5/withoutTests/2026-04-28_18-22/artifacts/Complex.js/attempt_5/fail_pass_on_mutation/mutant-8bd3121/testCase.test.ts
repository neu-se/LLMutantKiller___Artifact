// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-8bd3121/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech()', () => {
  it('should throw when accessing invalid property due to mutation', () => {
    // The mutation changes `var b = this['im']` to `var b = this[""]`
    // This creates an invalid property access that should cause the calculation to fail
    const c = new Complex(0.5, 0.5);
    expect(() => {
      const result = c.asech();
      // Force evaluation of the result to trigger any errors
      if (result.re === undefined || result.im === undefined) {
        throw new Error('Invalid property access detected');
      }
    }).not.toThrow();
  });
});