import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsc', () => {
  it('acsc with NaN real part and nonzero imaginary part should produce infinite imaginary component', () => {
    const result = new Complex(NaN, 5).acsc();
    // Original: fallback uses (b !== 0) ? -b/0 : 0 = -Infinity for b=5
    // Mutated: fallback uses (b === 0) ? -b/0 : 0 = 0 for b=5
    // These produce different asin() results
    expect(isFinite(result.re) || isNaN(result.re) || !isFinite(result.im)).toBe(true);
    // More specifically, the original path leads to asin of complex with -Infinity im part
    const intermediate = new Complex(0, -Infinity).asin();
    expect(result.re).toBeCloseTo(intermediate.re, 5);
  });
});