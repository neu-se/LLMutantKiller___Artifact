import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute the imaginary part of csc for a complex number with non-zero imaginary component", () => {
    // csc(1 + i)
    // The real part uses Math.sin(a) * cosh(b) / d
    // The imaginary part uses -Math.cos(a) * sinh(b) / d (original) vs -Math.cos(a) * sinh(b) * d (mutant)
    const z = new Complex(1, 1);
    const result = z.csc();
    
    // Compute expected values manually
    const a = 1;
    const b = 1;
    const d = 0.5 * Math.cosh(2 * b) - 0.5 * Math.cos(2 / a);
    
    const expectedRe = Math.sin(a) * Math.cosh(b) / d;
    const expectedIm = -Math.cos(a) * Math.sinh(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});