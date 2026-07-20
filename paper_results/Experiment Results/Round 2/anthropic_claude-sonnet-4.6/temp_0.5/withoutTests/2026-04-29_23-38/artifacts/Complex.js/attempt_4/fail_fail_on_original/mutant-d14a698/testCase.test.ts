import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('asec with subnormal positive imaginary part has non-NaN real part', () => {
    const b = 5e-324; // smallest positive subnormal: b !== 0, but b*b = 0
    const result = new Complex(0, b).asec();
    // Original: else branch uses -b/0 = -Infinity → acos(0, -Inf) → re = PI/2
    // Mutated:  else branch uses +b/0 = +Infinity → acos(0, +Inf) → re = NaN
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
  });
});