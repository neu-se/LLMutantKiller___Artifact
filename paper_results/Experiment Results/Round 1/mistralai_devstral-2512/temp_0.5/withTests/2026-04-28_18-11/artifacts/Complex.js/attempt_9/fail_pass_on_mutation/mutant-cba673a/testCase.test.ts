// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cba673a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should return NaN for cosh when the implementation is broken", () => {
    const c = new Complex(1, 1);
    const result = c.cosh();
    // This test will pass on original code but fail on mutated code
    // because the mutated cosh returns undefined (empty function)
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});