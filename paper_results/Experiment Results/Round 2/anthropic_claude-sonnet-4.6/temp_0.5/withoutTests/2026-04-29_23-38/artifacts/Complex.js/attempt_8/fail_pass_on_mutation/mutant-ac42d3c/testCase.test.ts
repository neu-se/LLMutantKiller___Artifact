import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should return positive zero for real part of atan(0, -1)', () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    expect(result.im).toBe(-Infinity);
    // Original returns new Complex(0, -Infinity) - re is +0
    // Mutated computes -0.5 * 0 = -0
    expect(Object.is(result.re, 0)).toBe(true); // +0, not -0
    expect(Object.is(result.re, -0)).toBe(false);
  });
});