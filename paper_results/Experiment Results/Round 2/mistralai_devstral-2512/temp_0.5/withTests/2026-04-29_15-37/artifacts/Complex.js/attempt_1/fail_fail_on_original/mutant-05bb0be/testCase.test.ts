// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-05bb0be/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a real number greater than 1", () => {
    const result = new Complex(2, 0).atanh();
    // For a real number > 1, atanh should return a complex number with non-zero imaginary part
    expect(result.im).not.toBe(0);
    // The real part should be close to the expected value for atanh(2)
    expect(result.re).toBeCloseTo(0.5 * Math.log((1 + 2) / (2 - 1)), 10);
  });
});