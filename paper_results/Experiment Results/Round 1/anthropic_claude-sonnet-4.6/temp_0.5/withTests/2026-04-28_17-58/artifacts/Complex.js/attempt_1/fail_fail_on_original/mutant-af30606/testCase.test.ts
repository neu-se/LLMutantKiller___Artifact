import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the imaginary part of sech for a complex number with non-zero real and imaginary parts", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = 1 + i:
    // The imaginary part should be -2 * sinh(a) * sin(b) / d
    // where d = cos(2b) + cosh(2a)
    // The mutation changes sinh(a) multiplication to sinh(a) division
    // i.e., -2 / sinh(a) * sin(b) / d instead of -2 * sinh(a) * sin(b) / d
    
    const a = 1;
    const b = 1;
    
    // Compute expected values manually
    const sinhA = Math.sinh(a);
    const cosB = Math.cos(b);
    const sinB = Math.sin(b);
    const coshA = Math.cosh(a);
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    
    const expectedRe = 2 / coshA * cosB / d;
    const expectedIm = -2 * sinhA * sinB / d;
    
    const result = new Complex(a, b).sech();
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});