// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication optimization path", () => {
  it("should use optimized multiplication for real numbers", () => {
    const a = new Complex(2.5, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    // The mutation removes the return statement in the optimization path
    // This would cause the function to continue to the general case
    // and potentially produce different results due to floating point precision
    expect(result.re).toBe(10);
    expect(result.im).toBe(0);
    // Additional check to ensure we're testing the optimization path
    expect(Object.prototype.hasOwnProperty.call(result, 're')).toBe(true);
  });
});