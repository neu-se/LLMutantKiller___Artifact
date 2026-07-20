// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh()", () => {
  it("should handle non-zero inputs correctly and not return NaN", () => {
    const result = new Complex(2, 3).sinh();
    expect(result.isNaN()).toBe(false);
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});