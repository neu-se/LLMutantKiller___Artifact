import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asec mutation detection', () => {
  it('should correctly compute asec(i) where re=0 and im=1, not return (0, Infinity)', () => {
    // For input z = i (re=0, im=1), the original code should NOT return Complex(0, Infinity)
    // because im !== 0. The mutated code changes the condition from (a===0 && b===0)
    // to (a===0 && true), causing it to incorrectly return (0, Infinity) for any input with re=0.
    const result = new Complex(0, 1).asec();

    // In the original code, this should be a finite complex number
    // In the mutated code, this incorrectly returns Complex(0, Infinity)
    expect(result.isInfinite()).toBe(false);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);

    // The actual value should match acos(1/i) = acos(-i)
    // which is computed via new Complex(0, -1).acos()
    const expected = new Complex(0, -1).acos();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});