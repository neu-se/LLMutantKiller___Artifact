import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the imaginary part of sech for a complex number with non-zero real and imaginary parts", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = 1 + i:
    // The imaginary part should be -2 * sinh(a) * sin(b) / d
    // where d = cos(2b) + cosh(2a)
    // The mutation changes sinh(a) multiplication to division: -2 / sinh(a) * sin(b) / d
    
    const a = 1;
    const b = 1;
    
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedRe = 2 / Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    const result = new Complex(a, b).sech();
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});