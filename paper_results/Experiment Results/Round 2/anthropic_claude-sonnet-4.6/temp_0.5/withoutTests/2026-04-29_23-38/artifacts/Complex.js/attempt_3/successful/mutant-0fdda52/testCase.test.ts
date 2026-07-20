import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot mutation detection', () => {
  it('correctly computes abs for very large real with moderate imaginary', () => {
    // x=1e200, y=4000: a=1e200, b=4000, both >= 3000
    // Original: a < b? NO -> b = y/x = 4000/1e200 ~ 0, result = 1e200 * sqrt(1) = 1e200 (finite)
    // Mutated: a >= b? YES -> a = b = 4000, b = x/y = 1e200/4000, b*b overflows -> Infinity
    const c = new Complex(1e200, 4000);
    const result = c.abs();
    expect(isFinite(result)).toBe(true);
  });
});