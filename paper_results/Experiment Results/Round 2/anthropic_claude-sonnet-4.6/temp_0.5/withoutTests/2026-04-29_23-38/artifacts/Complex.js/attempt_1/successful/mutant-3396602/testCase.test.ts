import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute csc(z) for a complex number with non-zero real and imaginary parts", () => {
    // csc(c) = 2i / (e^(ci) - e^(-ci))
    // The denominator d = 0.5 * cosh(2*b) - 0.5 * cos(2*a)
    // For z = 1 + i, a=1, b=1:
    // Original: d = 0.5 * cosh(2) - 0.5 * cos(2)
    // Mutated:  d = 0.5 * cosh(2) - 0.5 / cos(2)
    // These produce different values, so csc result will differ
    
    const z = new Complex(1, 1);
    const result = z.csc();
    
    // Compute expected values manually:
    // a = 1, b = 1
    // d = 0.5 * cosh(2) - 0.5 * cos(2)
    const a = 1;
    const b = 1;
    const cosh2b = Math.cosh(2 * b);
    const cos2a = Math.cos(2 * a);
    const d = 0.5 * cosh2b - 0.5 * cos2a;
    
    const expectedRe = Math.sin(a) * Math.cosh(b) / d;
    const expectedIm = -Math.cos(a) * Math.sinh(b) / d;
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});