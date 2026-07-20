// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5bc417c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acoth()", () => {
  it("should return correct value for non-zero complex number", () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation causes acoth to always return {re: 0, im: π/2}
    // For input (2, 3), the correct result should be different
    expect(result.re).toBeCloseTo(0.152225, 5);
    expect(result.im).toBeCloseTo(-0.32175, 5);
  });
});