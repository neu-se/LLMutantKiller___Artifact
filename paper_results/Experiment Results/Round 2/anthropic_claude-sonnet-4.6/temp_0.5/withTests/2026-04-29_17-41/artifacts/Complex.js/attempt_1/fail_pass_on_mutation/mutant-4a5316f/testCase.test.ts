import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth mutation detection', () => {
  it('should compute acoth correctly for a purely imaginary number', () => {
    // acoth(i) = acoth(0 + 1i)
    // d = 0*0 + 1*1 = 1, so d !== 0
    // result = new Complex(0/1, -1/1).atanh() = new Complex(0, -1).atanh()
    const result = new Complex(0, 1).acoth();
    const expected = new Complex(0, -1).atanh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});