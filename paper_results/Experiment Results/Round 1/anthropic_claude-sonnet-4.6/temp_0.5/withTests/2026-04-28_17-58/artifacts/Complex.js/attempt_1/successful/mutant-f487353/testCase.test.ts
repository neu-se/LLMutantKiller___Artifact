import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should compute the imaginary part of csc with the correct sign", () => {
    // csc(c) = 2i / (e^(ci) - e^(-ci))
    // For a real number a, csc(a) should be real (imaginary part = 0)
    // For a complex number a + bi with b != 0, the imaginary part should be -cos(a)*sinh(b)/d
    // The mutation changes -Math.cos(a) * sinh(b) / d to +Math.cos(a) * sinh(b) / d
    
    // Use z = 1 + 1i
    // d = 0.5 * cosh(2*1) - 0.5 * cos(2*1)
    // im = -cos(1) * sinh(1) / d
    
    const a = 1;
    const b = 1;
    const result = new Complex(a, b).csc();
    
    // Calculate expected values manually
    const d = 0.5 * Math.cosh(2 * b) - 0.5 * Math.cos(2 * a);
    const expectedRe = Math.sin(a) * Math.cosh(b) / d;
    const expectedIm = -Math.cos(a) * Math.sinh(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
    // Specifically check that the imaginary part is negative (not positive as in the mutation)
    expect(result.im).toBeLessThan(0);
  });
});