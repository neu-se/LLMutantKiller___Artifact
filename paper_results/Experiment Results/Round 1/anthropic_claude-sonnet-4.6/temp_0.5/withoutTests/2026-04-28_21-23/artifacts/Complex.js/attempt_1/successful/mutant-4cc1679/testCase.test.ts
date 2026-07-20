import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return a valid complex number with correct real and imaginary parts", () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    
    // acosh(2) = log(2 + sqrt(3)) ≈ 1.3169578969248166
    expect(result).toBeDefined();
    expect(result).not.toBeUndefined();
    expect(typeof result.re).toBe("number");
    expect(typeof result.im).toBe("number");
    
    // The real part should be approximately 1.3169578969248166
    expect(Math.abs(result.re - 1.3169578969248166)).toBeLessThan(1e-10);
    // The imaginary part should be approximately 0
    expect(Math.abs(result.im)).toBeLessThan(1e-10);
  });
});