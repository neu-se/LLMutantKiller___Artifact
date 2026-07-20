// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ac0d76/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log()", () => {
  it("should correctly compute the logarithm of a positive real number and fail for non-positive numbers in the mutant", () => {
    const positiveReal = new Complex(2, 0);
    const positiveResult = positiveReal.log();
    expect(positiveResult.re).toBeCloseTo(Math.log(2));
    expect(positiveResult.im).toBe(0);

    const negativeReal = new Complex(-2, 0);
    const negativeResult = negativeReal.log();
    expect(negativeResult.re).toBeCloseTo(Math.log(2));
    expect(negativeResult.im).toBeCloseTo(Math.PI);
  });
});