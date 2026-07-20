import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acosh', () => {
  it('acosh(2) should give the correct real result', () => {
    // acosh(2) = 1.3169578969248166 (real number, no imaginary part)
    // acos(2) has negative imaginary part so if-branch is taken
    // if-branch: res['re'] = -res['im'] (original), res['im'] = tmp (= res['re'])
    const result = new Complex(2, 0).acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});