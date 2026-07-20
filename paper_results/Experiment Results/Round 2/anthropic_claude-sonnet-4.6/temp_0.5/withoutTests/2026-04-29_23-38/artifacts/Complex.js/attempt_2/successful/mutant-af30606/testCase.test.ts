import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute the imaginary part of sech(1+i)", () => {
    // sech(c) = 2 / (e^c + e^-c)
    // For c = a + bi, the implementation computes:
    // re = 2 / cosh(a) * cos(b) / d
    // im = -2 * sinh(a) * sin(b) / d   (original)
    // im = -2 / sinh(a) * sin(b) / d   (mutated)
    // where d = cos(2b) + cosh(2a)
    
    const a = 1;
    const b = 1;
    const result = new Complex(a, b).sech();
    
    // Compute expected imaginary part using the original formula
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    // The mutated value would be:
    // -2 / Math.sinh(a) * Math.sin(b) / d
    // sinh(1) ≈ 1.1752, so these differ significantly
    
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});