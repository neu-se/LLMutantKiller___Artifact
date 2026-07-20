import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sech with zero imaginary part', () => {
  it('sech of real number 1 should equal 1/cosh(1)', () => {
    const c = new Complex(1, 0);
    const result = c['sech']();
    // sech(1) = 1/cosh(1)
    const expected = 1 / Math.cosh(1);
    // With mutation b=undefined: d = cos(0) + cosh(2) = NaN... wait cos(2*undefined)=NaN
    // Actually for im=0: this['im']=0, this[""]=undefined
    // d = Math.cos(2*undefined) + cosh(2*1) = NaN + cosh(2) = NaN
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});