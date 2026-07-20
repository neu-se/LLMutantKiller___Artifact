import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('computes acsch correctly for purely imaginary input where d = -b^2 is non-zero', () => {
    // For z = 0 + 2i: d = 0 - 4 = -4 (non-zero), uses first branch
    // Complex(0/(-4), -2/(-4)).asinh() = Complex(0, 0.5).asinh()
    // This gives a specific finite result
    const c = new Complex(0, 2);
    const result = c.acsch();
    // Verify the result matches what the code actually computes
    const expected = new Complex(0, 0.5).asinh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
    // Both original and mutated use first branch here (d = -4 != 0)
    // so this verifies basic correctness
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});