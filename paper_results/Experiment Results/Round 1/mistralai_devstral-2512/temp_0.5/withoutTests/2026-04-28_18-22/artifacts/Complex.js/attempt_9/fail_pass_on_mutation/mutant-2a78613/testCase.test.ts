// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2a78613/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should use optimized path for real number multiplication", () => {
    const a = new Complex(2, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    // The mutation removes the return statement in the optimization path
    // This would cause the function to continue to the general case
    // and potentially produce different results due to floating point precision
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    // Verify the result is exactly what we expect from the optimized path
    expect(result.re).toBeCloseTo(6, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});