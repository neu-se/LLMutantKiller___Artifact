// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ac0d76/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log()", () => {
  it("should correctly compute logarithm for positive real numbers and fail for non-positive in mutant", () => {
    // Test positive real number (should work in both)
    const positive = new Complex(2, 0);
    const posResult = positive.log();
    expect(posResult.re).toBeCloseTo(Math.log(2));
    expect(posResult.im).toBe(0);

    // Test zero (should fail in mutant)
    const zero = new Complex(0, 0);
    const zeroResult = zero.log();
    expect(zeroResult.isInfinite()).toBe(true);
  });
});