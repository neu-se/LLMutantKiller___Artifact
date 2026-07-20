import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acoth', () => {
  it('acoth with NaN input', () => {
    const result = new Complex(NaN, 0).acoth();
    expect(result.isNaN()).toBe(true);
  });
});