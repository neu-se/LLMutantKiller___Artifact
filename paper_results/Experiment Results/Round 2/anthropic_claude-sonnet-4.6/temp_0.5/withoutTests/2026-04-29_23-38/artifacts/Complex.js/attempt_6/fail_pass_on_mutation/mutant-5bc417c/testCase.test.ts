import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acoth', () => {
  it('acoth(5+3i) computes correct value', () => {
    const result = new Complex(5, 3).acoth();
    expect(result.re).toBeCloseTo(0.1469466662255298);
  });
});