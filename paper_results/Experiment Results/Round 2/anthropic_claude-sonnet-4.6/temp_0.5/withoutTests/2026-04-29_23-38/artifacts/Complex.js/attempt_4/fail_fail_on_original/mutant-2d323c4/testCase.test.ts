import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('acsch(1+i) where d=0 should be NaN', () => {
    const result = new Complex(1, 1).acsch();
    expect(result.isNaN()).toBe(true);
  });
});