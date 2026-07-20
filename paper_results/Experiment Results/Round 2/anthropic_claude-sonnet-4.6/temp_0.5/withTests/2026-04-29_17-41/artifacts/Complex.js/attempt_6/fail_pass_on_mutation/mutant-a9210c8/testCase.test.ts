import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech", () => {
  it("sech of real number 1 should have a finite real part equal to 1/cosh(1)", () => {
    const result = new Complex(1, 0).sech();
    // Original: b = this['im'] = 0
    //   d = Math.cos(2*0) + cosh(2*1) = 1 + cosh(2) (finite, non-NaN)
    //   re = 2 * cosh(1) * Math.cos(0) / d = 2*cosh(1)/(1+cosh(2)) = 1/cosh(1)
    // Mutated: b = this[""] = undefined
    //   d = Math.cos(NaN) + cosh(2) = NaN
    //   re = 2 * cosh(1) * Math.cos(undefined) / NaN = NaN
    const expectedRe = 1 / Math.cosh(1);
    expect(result.re).not.toBeNaN();
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});