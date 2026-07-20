import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sech', () => {
  it('sech toString representation is not affected by mutation in comments', () => {
    // Test that sech produces a finite, non-NaN result for real input
    // If mutation causes b=undefined in sech body, d=NaN for ALL inputs including real
    const c = new Complex(0.5, 0);
    const result = c['sech']();
    const expected = 1 / Math.cosh(0.5);
    // This will fail if b=undefined makes d=NaN
    expect(isFinite(result.re)).toBe(true);
    expect(result.re).toBeCloseTo(expected, 10);
  });
});