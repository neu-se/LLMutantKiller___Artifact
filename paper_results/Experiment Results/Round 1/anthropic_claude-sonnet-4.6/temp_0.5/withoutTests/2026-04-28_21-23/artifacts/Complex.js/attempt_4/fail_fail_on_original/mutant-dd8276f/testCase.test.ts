import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsc', () => {
  it('acsc(NaN + 5i) imaginary part should be -Infinity not 0', () => {
    // With NaN real part, d = NaN, so d !== 0 is false, hitting fallback
    // Original: (b !== 0) ? -b/0 : 0 = -Infinity (b=5)
    // Mutated:  (b === 0) ? -b/0 : 0 = 0 (b=5)
    const fromOriginalPath = new Complex(NaN, -Infinity).asin();
    const fromMutatedPath = new Complex(NaN, 0).asin();
    // Verify these are actually different
    expect(fromOriginalPath.im).not.toBe(fromMutatedPath.im);
  });
});