import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot mutation detection', () => {
  it('should correctly compute log of complex number with very large real part', () => {
    // When a is very large (>= 3000) and b is small, logHypot should use overflow-safe path
    // With a = 1e200, b = 1: naive a*a overflows to Infinity
    // Original: uses safe path, gives correct result
    // Mutated: uses naive path (since true && _b < 3000), gives Infinity
    const c = new Complex(1e200, 1);
    const result = c.log();
    
    // log(1e200 + i) ≈ log(1e200) + i*atan2(1, 1e200)
    // real part should be approximately 200 * ln(10) ≈ 460.517...
    expect(result.re).toBeCloseTo(200 * Math.log(10), 5);
    expect(isFinite(result.re)).toBe(true);
  });
});