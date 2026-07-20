import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should return a finite real value for sech(1+0i)", () => {
    // sech(1) = 1/cosh(1) ≈ 0.6480542736638853
    // With mutation: b = this[""] = undefined
    // d = Math.cos(2 * undefined) + cosh(2 * 1) = NaN + cosh(2) = NaN
    // result.re = 2 * cosh(1) * Math.cos(0) / NaN = NaN
    const c = new Complex(1, 0);
    const result = c.sech();
    
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(1 / Math.cosh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});