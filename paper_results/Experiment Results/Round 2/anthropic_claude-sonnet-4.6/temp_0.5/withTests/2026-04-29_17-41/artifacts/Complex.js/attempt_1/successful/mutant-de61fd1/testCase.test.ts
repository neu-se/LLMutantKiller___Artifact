import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute sech of a complex number with non-zero real and imaginary parts", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = 1 + i:
    // The denominator in the implementation is: Math.cos(2*b) + cosh(2*a)
    // Original: cos(2) + cosh(2) ≈ -0.4161 + 3.7622 ≈ 3.3461
    // Mutated:  cos(2) - cosh(2) ≈ -0.4161 - 3.7622 ≈ -4.1783
    // These give different results, so the re and im parts will differ
    
    const c = new Complex(1, 1);
    const result = c.sech();
    
    // Expected values for sech(1+i):
    // sech(1+i) = 2*cosh(1)*cos(1) / d + i * (-2*sinh(1)*sin(1) / d)
    // where d = cos(2) + cosh(2)
    const a = 1;
    const b = 1;
    const coshA = Math.cosh(a);
    const sinhA = Math.sinh(a);
    const cosB = Math.cos(b);
    const sinB = Math.sin(b);
    const d = Math.cos(2 * b) + Math.cosh(2 * a); // original formula
    
    const expectedRe = 2 * coshA * cosB / d;
    const expectedIm = -2 * sinhA * sinB / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});