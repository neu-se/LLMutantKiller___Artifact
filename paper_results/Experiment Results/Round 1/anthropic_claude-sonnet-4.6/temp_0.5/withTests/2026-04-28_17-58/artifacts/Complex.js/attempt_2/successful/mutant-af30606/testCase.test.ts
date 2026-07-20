import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the imaginary part of sech for a complex number with non-zero real and imaginary parts", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // Original: im = -2 * sinh(a) * sin(b) / d
    // Mutated:  im = -2 / sinh(a) * sin(b) / d
    // where d = cos(2b) + cosh(2a)
    
    const a = 2;
    const b = 1;
    
    const sinhA = Math.sinh(a);
    const cosB = Math.cos(b);
    const sinB = Math.sin(b);
    const coshA = Math.cosh(a);
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    
    // Expected imaginary part using original formula: -2 * sinh(a) * sin(b) / d
    const expectedIm = -2 * sinhA * sinB / d;
    
    // Mutated imaginary part would be: -2 / sinh(a) * sin(b) / d
    const mutatedIm = -2 / sinhA * sinB / d;
    
    // Verify the two values are actually different (so the test is meaningful)
    expect(Math.abs(expectedIm - mutatedIm)).toBeGreaterThan(0.01);
    
    const result = new Complex(a, b).sech();
    
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});