import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('acot with tiny nonzero real and imaginary parts should give NaN when d underflows', () => {
    // a=1e-200, b=1e-200: d = a*a + b*b = 0 (underflows)
    // Original: Complex(Infinity, Infinity).atan() -> NaN
    // Mutated:  Complex(0, Infinity).atan() -> NaN  
    // Both give NaN, so let's check the im part specifically
    const result = new Complex(1e-200, 1e-200).acot();
    // Both should give NaN
    expect(result.isNaN()).toBe(true);
    // But check if re is specifically NaN (not just im)
    expect(isNaN(result.re)).toBe(true);
  });
});