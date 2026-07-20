import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the imaginary part of sech for a complex number with non-zero real and imaginary parts", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = 1 + i:
    // sech(1+i) imaginary part involves sinh(a) * Math.sin(b) / d
    // Original: -2 * sinh(a) * Math.sin(b) / d
    // Mutated:  -2 / sinh(a) * Math.sin(b) / d
    // These differ when sinh(a) != 1, e.g., a = 1
    
    const a = 1;
    const b = 1;
    const result = new Complex(a, b).sech();
    
    // Compute expected value manually
    // d = cos(2b) + cosh(2a)
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedRe = 2 / Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});