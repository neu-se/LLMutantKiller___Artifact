import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sec function", () => {
  it("should correctly compute the secant of a complex number with non-zero real part", () => {
    // sec(z) = 1 / cos(z)
    // The denominator d = 0.5 * cosh(2b) + 0.5 * cos(2a)
    // Mutation changes cos(2*a) to cos(2/a), which gives different results when a != 0
    
    // Use a = 1, b = 0 (real number)
    // Original: d = 0.5 * cosh(0) + 0.5 * cos(2*1) = 0.5 * 1 + 0.5 * cos(2)
    // Mutated:  d = 0.5 * cosh(0) + 0.5 * cos(2/1) = 0.5 * 1 + 0.5 * cos(2) (same for a=1!)
    
    // Use a = 2, b = 0
    // Original: d = 0.5 * cosh(0) + 0.5 * cos(2*2) = 0.5 + 0.5 * cos(4)
    // Mutated:  d = 0.5 * cosh(0) + 0.5 * cos(2/2) = 0.5 + 0.5 * cos(1)
    // These are different!
    
    const z = new Complex(2, 0);
    const result = z.sec();
    
    // sec(2) = 1/cos(2) ≈ -2.4029979617...
    const expected = 1 / Math.cos(2);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});