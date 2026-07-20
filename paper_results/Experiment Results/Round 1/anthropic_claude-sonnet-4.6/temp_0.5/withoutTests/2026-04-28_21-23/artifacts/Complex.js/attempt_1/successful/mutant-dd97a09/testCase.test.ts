import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    
    // sech(1 + i) should return a valid complex number
    // The original implementation computes:
    // d = cos(2*b) + cosh(2*a)
    // re = 2 * cosh(a) * cos(b) / d
    // im = -2 * sinh(a) * sin(b) / d
    
    // Expected values for sech(1 + i):
    // a = 1, b = 1
    // d = cos(2) + cosh(2) ≈ -0.4161 + 3.7622 ≈ 3.3461
    // re = 2 * cosh(1) * cos(1) / d ≈ 2 * 1.5431 * 0.5403 / 3.3461 ≈ 0.4983
    // im = -2 * sinh(1) * sin(1) / d ≈ -2 * 1.1752 * 0.8415 / 3.3461 ≈ -0.5911
    
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(0.4983, 4);
    expect(result.im).toBeCloseTo(-0.5911, 4);
  });
});