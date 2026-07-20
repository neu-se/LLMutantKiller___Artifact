// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5bc417c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return different results for different inputs", () => {
    const c1 = new Complex(2, 3);
    const c2 = new Complex(4, 5);
    const result1 = c1.acoth();
    const result2 = c2.acoth();
    // The mutation causes acoth to always return {re: 0, im: π/2}
    // The original implementation should return different results for different inputs
    expect(result1.re).not.toBe(result2.re);
    expect(result1.im).not.toBe(result2.im);
  });
});