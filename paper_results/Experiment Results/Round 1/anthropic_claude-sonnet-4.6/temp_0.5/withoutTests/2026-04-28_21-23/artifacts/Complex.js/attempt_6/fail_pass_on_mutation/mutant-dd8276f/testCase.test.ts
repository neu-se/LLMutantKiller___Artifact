import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsc', () => {
  it('acsc(NaN + 0i) real part should be NaN but imaginary part behavior differs from mutant', () => {
    const result = new Complex(NaN, 0).acsc();
    const fromOriginalPath = new Complex(NaN, 0).asin();
    expect(result.re).toBe(fromOriginalPath.re);
    expect(result.im).toBe(fromOriginalPath.im);
  });
});