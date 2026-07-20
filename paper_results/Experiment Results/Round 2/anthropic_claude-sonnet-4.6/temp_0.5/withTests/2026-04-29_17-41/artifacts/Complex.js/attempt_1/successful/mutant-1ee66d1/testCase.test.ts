import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('should return complex infinity imaginary part when called with very small imaginary component causing d to underflow', () => {
    // Use a very small b value that causes a*a + b*b to underflow to 0
    // but b itself is non-zero, so the mutation changes -b/0 (Infinity) to -b*0 (0)
    const tiny = 5e-324; // smallest positive double
    const c = new Complex(0, tiny);
    const result = c.acsc();
    // With original code: -b/0 = -Infinity, asin of complex with -Infinity im part
    // With mutated code: -b*0 = 0, asin of complex with 0 im part
    expect(isFinite(result.re) || isFinite(result.im)).toBe(false);
  });
});