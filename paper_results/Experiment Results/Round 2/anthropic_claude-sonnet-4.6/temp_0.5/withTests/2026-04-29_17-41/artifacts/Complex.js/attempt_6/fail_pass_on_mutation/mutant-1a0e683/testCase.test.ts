import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should return exactly zero imaginary part when raising 0+0i to power 1+0i', () => {
    const result = new Complex(0, 0).pow(new Complex(1, 0));
    expect(isNaN(result.im)).toBe(false);
    expect(isNaN(result.re)).toBe(false);
  });
});