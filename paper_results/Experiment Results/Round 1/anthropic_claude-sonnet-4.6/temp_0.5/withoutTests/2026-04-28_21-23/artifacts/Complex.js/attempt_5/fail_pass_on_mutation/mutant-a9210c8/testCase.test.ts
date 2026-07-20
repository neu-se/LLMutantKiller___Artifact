import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech", () => {
  it("sech of pure imaginary number should equal 1/cos(b)", () => {
    // sech(i*b) = 1/cos(b) for real b
    // For z = 0 + 1i: sech = 1/cos(1) ≈ 1.8508...
    // With mutation var b = this[""] = undefined:
    // d = Math.cos(2*undefined) + cosh(0) = NaN + 1 = NaN
    // result.re = 2*cosh(0)*Math.cos(undefined)/NaN = NaN
    const z = new Complex(0, 1);
    const result = z.sech();
    const expected = 1 / Math.cos(1);
    
    expect(result.re).not.toBeNaN();
    expect(result.re).toBeCloseTo(expected, 5);
  });
});