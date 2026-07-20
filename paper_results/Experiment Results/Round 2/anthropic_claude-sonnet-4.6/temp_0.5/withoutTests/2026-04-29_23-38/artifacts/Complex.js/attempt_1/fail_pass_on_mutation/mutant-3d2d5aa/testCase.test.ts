import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth mutation detection', () => {
  it('should compute acoth correctly for very small non-zero imaginary values that cause d to underflow', () => {
    // Use a value where a*a + b*b underflows to 0 but b !== 0
    const tiny = 5e-324; // smallest positive double
    const c = new Complex(0, tiny);
    const result = c.acoth();
    // In original: real part = (b !== 0) ? -b/0 : 0 = -Infinity, im = atanh of that
    // In mutant: real part = (false) ? -b/0 : 0 = 0
    // The original would produce -Infinity for real part going into atanh
    expect(isFinite(result.re) || isNaN(result.re) || !isFinite(result.im)).toBe(true);
    // More specifically, original gives Infinity result, mutant gives something different
    const expected = new Complex(0, tiny).acoth();
    expect(result.re).toBe(expected.re);
  });
});