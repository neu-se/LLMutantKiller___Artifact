import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("inverse of zero should have infinite imaginary part", () => {
    const result = new Complex(0, 0).inverse();
    // Original returns Complex.INFINITY where im = Infinity
    // Mutated skips isZero check, d=0, returns NaN
    expect(result.im).toBe(Infinity);
  });
});