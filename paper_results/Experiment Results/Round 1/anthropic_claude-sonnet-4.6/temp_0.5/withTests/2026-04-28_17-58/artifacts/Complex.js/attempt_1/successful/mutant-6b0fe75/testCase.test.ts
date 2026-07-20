import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosh behavior with small imaginary values", () => {
  it("cos of a complex number with tiny imaginary part should use correct cosh value", () => {
    // cos(0 + 1e-10*i) = cos(0)*cosh(1e-10) - i*sin(0)*sinh(1e-10)
    // cosh(1e-10) should be ~1.000000000000000005e-20, not 1 - 1e-10
    const z = new Complex(0, 1e-10);
    const result = z.cos();
    
    // With native Math.cosh (original): cos(0)*cosh(1e-10) ≈ 1.0 (very close to 1)
    // With mutated custom function: cos(0)*(1 - 1e-10) = 1 - 1e-10 = 0.9999999999
    // The difference is 1e-10, which is larger than EPSILON (1e-15)
    expect(result.re).toBeCloseTo(1.0, 9);
    expect(Math.abs(result.re - 1.0)).toBeLessThan(1e-15);
  });
});