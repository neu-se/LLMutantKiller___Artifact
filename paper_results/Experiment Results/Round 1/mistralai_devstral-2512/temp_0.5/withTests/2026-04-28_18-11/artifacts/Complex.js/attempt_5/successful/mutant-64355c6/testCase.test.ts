// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-64355c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec()", () => {
  it("should return Infinity when called on zero but not on non-zero imaginary numbers", () => {
    const zero = new Complex(0, 0);
    const imaginary = new Complex(0, 1);
    const zeroResult = zero.asec();
    const imaginaryResult = imaginary.asec();

    expect(zeroResult.isInfinite()).toBe(true);
    expect(imaginaryResult.isFinite()).toBe(true);
  });
});