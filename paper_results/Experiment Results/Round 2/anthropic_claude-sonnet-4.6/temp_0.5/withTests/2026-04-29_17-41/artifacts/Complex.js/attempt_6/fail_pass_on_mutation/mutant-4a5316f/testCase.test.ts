import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('acoth of complex number has correct imaginary sign', () => {
    // acoth(0 + 2i) = atanh(0 - i/2) = atanh(0, -0.5)
    // atanh(0, -0.5): d = 1 + 0.25 = 1.25
    // x_re = (1 - 0.25)/1.25 = 0.6, x_im = (-0.5 + (-0.5))/1.25 = -0.8
    // result.im = atan2(-0.8, 0.6)/2 < 0
    const result = new Complex(0, 2).acoth();
    expect(result.im).toBeLessThan(0);
    expect(result.re).toBeCloseTo(0, 10);
  });
});