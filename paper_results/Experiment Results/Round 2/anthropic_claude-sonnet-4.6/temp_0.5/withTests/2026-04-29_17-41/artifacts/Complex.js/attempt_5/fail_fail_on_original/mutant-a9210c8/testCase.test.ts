import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech", () => {
  it("sech of real number 1 should equal 1/cosh(1) with zero imaginary part", () => {
    const result = new Complex(1, 0).sech();
    // Original: b = this['im'] = 0, d = Math.cos(0) + cosh(2) = 1 + cosh(2)
    // Mutated: b = this[""] = undefined, d = Math.cos(NaN) + cosh(2) = NaN
    const expectedRe = 1 / Math.cosh(1);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBe(0);
  });
});