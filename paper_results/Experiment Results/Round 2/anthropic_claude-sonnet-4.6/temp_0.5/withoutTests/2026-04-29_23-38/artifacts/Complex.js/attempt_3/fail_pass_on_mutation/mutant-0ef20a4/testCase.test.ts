import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return INFINITY when inverting the zero complex number", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    // In original: isZero() check returns Complex.INFINITY
    // In mutated: if(false) skips the check, proceeds to compute 0/0 = NaN
    expect(isFinite(result.re) || result.re === Infinity).toBe(true);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});