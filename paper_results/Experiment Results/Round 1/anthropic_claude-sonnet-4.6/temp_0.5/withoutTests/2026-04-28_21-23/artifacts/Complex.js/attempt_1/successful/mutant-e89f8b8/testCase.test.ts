import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should compute the real part of csc(z) correctly for a complex number", () => {
    // csc(z) = 1/sin(z)
    // For z = 1 + i, we can verify by computing sin(z) and taking its inverse
    // sin(1+i) = sin(1)cosh(1) + i*cos(1)sinh(1)
    const z = new Complex(1, 1);
    const result = z.csc();
    
    // The real part of csc should be: Math.sin(a) * cosh(b) / d
    // where d = 0.5 * cosh(2b) - 0.5 * cos(2a)
    // The mutation changes the real part from -Math.cos(a) * sinh(b) / d
    // to -Math.cos(a) * sinh(b) * d (multiplication instead of division)
    
    // Compute expected values manually
    const a = 1;
    const b = 1;
    const d = 0.5 * Math.cosh(2 * b) - 0.5 * Math.cos(2 * a);
    
    const expectedRe = Math.sin(a) * Math.cosh(b) / d;
    const expectedIm = -Math.cos(a) * Math.sinh(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});