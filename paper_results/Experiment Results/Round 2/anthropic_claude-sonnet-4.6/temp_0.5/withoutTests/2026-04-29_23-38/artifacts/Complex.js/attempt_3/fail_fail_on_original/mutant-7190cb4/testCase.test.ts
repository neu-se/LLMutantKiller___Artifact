import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('computes acsc correctly when b is tiny causing d to underflow to zero', () => {
    const b = 5e-324; // Number.MIN_VALUE - b*b underflows to 0, so d=0
    const result = new Complex(0, b).acsc();
    // Original: uses -b/0 = -Infinity → asin(0, -Infinity) → finite result
    // Mutated:  uses +b/0 = +Infinity → asin(0, +Infinity) → NaN result (Infinity - Infinity)
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});