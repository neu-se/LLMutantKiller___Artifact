import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sinh fallback behavior", () => {
  it("should compute sin of complex number with non-trivial imaginary part correctly", () => {
    // sin(a + bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // For Complex(Math.PI/2, 1):
    // re = sin(π/2)*cosh(1) = 1 * cosh(1) = cosh(1)
    // im = cos(π/2)*sinh(1) ≈ 0 * sinh(1) ≈ 0
    // Use a value where sinh appears prominently
    // Complex(1, 1).sinh():
    // re = sinh(1)*cos(1), im = cosh(1)*sin(1)
    const c = new Complex(1, 1);
    const result = c.sinh();
    
    const expectedRe = Math.sinh(1) * Math.cos(1);
    const expectedIm = Math.cosh(1) * Math.sin(1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});