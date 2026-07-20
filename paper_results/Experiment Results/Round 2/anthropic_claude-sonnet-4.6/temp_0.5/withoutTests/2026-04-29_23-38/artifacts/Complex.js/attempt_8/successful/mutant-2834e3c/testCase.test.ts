import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('detects mutation: asech of purely imaginary tiny number should produce NaN not finite result', () => {
    const c = new Complex(0, 5e-200);
    const result = c.asech();
    // Original: new Complex(0, -Infinity).acosh() → NaN
    // Mutated: new Complex(0, 0).acosh() → finite result
    expect(isNaN(result.re) || isNaN(result.im)).toBe(true);
  });
});