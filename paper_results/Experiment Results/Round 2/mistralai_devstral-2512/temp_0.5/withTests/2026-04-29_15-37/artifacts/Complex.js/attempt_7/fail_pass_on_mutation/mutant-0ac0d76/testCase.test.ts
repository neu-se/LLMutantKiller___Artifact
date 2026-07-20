// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0ac0d76/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log()", () => {
  it("should correctly compute the logarithm of a positive real number and handle zero imaginary part", () => {
    const c = new Complex(1, 0);
    const result = c.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBe(0);

    const negativeReal = new Complex(-1, 0);
    const negativeResult = negativeReal.log();
    expect(negativeResult.re).toBeCloseTo(Math.log(1));
    expect(negativeResult.im).toBeCloseTo(Math.PI);
  });
});