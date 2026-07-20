import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acoth', () => {
  it('acoth(3+0i) equals atanh(1/3)', () => {
    const acothResult = new Complex(3, 0).acoth();
    const atanhResult = new Complex(1/3, 0).atanh();
    expect(acothResult.re).toBeCloseTo(atanhResult.re);
    expect(acothResult.im).toBeCloseTo(atanhResult.im);
  });
});