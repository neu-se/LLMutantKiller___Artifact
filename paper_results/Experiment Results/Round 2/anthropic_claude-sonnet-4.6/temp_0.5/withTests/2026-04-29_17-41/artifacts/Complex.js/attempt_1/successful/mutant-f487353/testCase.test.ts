import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should return the correct imaginary part for csc of a complex number with non-zero imaginary component", () => {
    // csc(c) = 2i / (e^(ci) - e^(-ci))
    // For a real number a, csc(a) = 1/sin(a), with im part = 0
    // For a complex number a + bi:
    // d = 0.5 * cosh(2b) - 0.5 * cos(2a)
    // re = sin(a) * cosh(b) / d
    // im = -cos(a) * sinh(b) / d  (original)
    // im = +cos(a) * sinh(b) / d  (mutated)
    
    // Use a = 1, b = 1 to get non-trivial values
    const z = new Complex(1, 1);
    const result = z.csc();
    
    // Calculate expected values manually
    const a = 1;
    const b = 1;
    const coshB = Math.cosh(b);
    const sinhB = Math.sinh(b);
    const d = 0.5 * Math.cosh(2 * b) - 0.5 * Math.cos(2 * a);
    
    const expectedRe = Math.sin(a) * coshB / d;
    const expectedIm = -Math.cos(a) * sinhB / d; // original: negative sign
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
    // The imaginary part should be negative (since cos(1) > 0 and sinh(1) > 0 and d > 0)
    expect(result.im).toBeLessThan(0);
  });
});