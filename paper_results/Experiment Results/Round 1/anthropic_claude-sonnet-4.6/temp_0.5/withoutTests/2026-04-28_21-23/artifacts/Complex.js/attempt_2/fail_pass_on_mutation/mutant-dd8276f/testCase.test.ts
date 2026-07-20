import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsc with NaN input', () => {
  it('acsc of NaN complex number should return NaN for imaginary part', () => {
    const result = new Complex(NaN, NaN).acsc();
    expect(isNaN(result.im)).toBe(true);
  });
});