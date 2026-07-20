import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acoth', () => {
  it('acoth(1+0i) returns Infinity', () => {
    const result = new Complex(1, 0).acoth();
    expect(result.re).toBe(Infinity);
  });
});