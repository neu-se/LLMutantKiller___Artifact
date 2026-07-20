import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should correctly compute acot(0 + 1e-200i) where d underflows to zero', () => {
    const result = new Complex(0, 1e-200).acot();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});