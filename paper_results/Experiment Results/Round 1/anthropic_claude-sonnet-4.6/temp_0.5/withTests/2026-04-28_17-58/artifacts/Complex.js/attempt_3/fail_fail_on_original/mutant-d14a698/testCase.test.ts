import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('should produce non-NaN result for asec of extremely small positive imaginary number', () => {
    // Number.MIN_VALUE squared underflows to 0, so d = a*a + b*b = 0
    // but b = Number.MIN_VALUE != 0, so early return is NOT triggered
    // Original: uses -b/0 = -Infinity for im part → acos(0 - i*Inf) → finite/infinite but not NaN
    // Mutated:  uses +b/0 = +Infinity for im part → acos(0 + i*Inf) → NaN due to Inf - Inf
    const b = Number.MIN_VALUE;
    const z = new Complex(0, b);
    const result = z.asec();
    expect(result.isNaN()).toBe(false);
  });
});