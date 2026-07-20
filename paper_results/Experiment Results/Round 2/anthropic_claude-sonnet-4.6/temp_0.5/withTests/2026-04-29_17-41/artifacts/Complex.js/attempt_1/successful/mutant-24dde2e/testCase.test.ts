import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('should correctly compute asec for a complex number with non-zero imaginary part', () => {
    // For z = 1 + i, asec(z) should produce a finite complex number
    // With original code: d = 1^2 + 1^2 = 2, so acos(0.5 - 0.5i) is computed
    // With mutated code: d = 1^2 - 1^2 = 0, causing division by zero (Infinity)
    const z = new Complex(1, 1);
    const result = z.asec();
    
    // The result should be a finite complex number, not NaN or Infinity
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    
    // Verify the actual values match expected asec(1+i)
    // asec(z) = acos(1/z), and 1/(1+i) = (1-i)/2 = 0.5 - 0.5i
    const expected = new Complex(0.5, -0.5).acos();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});