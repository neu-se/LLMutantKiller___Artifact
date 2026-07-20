import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('acsch(1-i) where d = 1-1 = 0', () => {
    const result = new Complex(1, -1).acsch();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});