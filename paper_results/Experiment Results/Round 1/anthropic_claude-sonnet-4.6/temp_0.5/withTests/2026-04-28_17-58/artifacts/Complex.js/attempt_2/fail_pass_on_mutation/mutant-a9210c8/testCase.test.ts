import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sech mutation detection', () => {
  it('sech of a purely imaginary number should have correct real part', () => {
    // sech(0 + i*π/4): a=0, b=π/4
    // d = cos(2*π/4) + cosh(0) = cos(π/2) + 1 = 0 + 1 = 1
    // re = 2*cosh(0)*cos(π/4)/1 = 2*1*(√2/2) = √2
    // im = -2*sinh(0)*sin(π/4)/1 = 0
    const c = new Complex(0, Math.PI / 4);
    const result = c['sech']();
    expect(result.re).toBeCloseTo(Math.SQRT2, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});