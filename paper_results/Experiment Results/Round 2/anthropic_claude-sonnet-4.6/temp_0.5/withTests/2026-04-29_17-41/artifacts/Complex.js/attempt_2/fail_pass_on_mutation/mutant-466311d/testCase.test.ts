import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log with moderately large real part", () => {
  it("should correctly compute log of complex number where real part >= 3000 and imaginary part < 3000", () => {
    // a=1e154, b=1: a*a = 1e308 (overflows to Infinity in simple formula)
    // original: _a=1e154 >= 3000, so uses safe path with halving
    // mutated: condition is (true && _b < 3000), so uses simple formula -> Infinity
    const result = new Complex(1e154, 1).log();
    expect(isFinite(result.re)).toBe(true);
    expect(result.re).toBeCloseTo(154 * Math.LN10, 3);
  });
});