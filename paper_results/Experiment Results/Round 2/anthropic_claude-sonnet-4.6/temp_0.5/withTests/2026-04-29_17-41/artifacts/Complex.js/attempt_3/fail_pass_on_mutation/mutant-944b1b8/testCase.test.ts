import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asec mutation detection', () => {
  it('asec(0+2i) imaginary part should be finite and non-NaN', () => {
    const result = new Complex(0, 2).asec();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});