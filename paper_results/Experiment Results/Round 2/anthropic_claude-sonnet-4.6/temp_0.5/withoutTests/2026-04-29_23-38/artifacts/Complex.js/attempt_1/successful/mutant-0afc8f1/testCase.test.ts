import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech function", () => {
  it("should return the correct complex inverse hyperbolic secant for a real number", () => {
    // asech(0.5) should return a valid complex number, not undefined
    const c = new Complex(0.5, 0);
    const result = c.asech();
    
    // The result should be defined and have real and imaginary parts
    expect(result).toBeDefined();
    expect(result).not.toBeUndefined();
    
    // asech(0.5) = acosh(1/0.5) = acosh(2) ≈ 1.3169578969248166
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});