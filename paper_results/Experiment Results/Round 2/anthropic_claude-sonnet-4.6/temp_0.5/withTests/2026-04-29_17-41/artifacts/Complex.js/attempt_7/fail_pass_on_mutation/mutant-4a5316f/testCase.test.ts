import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('should produce correct result for acoth near zero imaginary axis', () => {
    // Use a value where d != 0 but result is well-defined
    // acoth(0 + 0.5i): d = 0.25, input to atanh = (0, -2)
    // atanh(0, -2): d = 1 + 4 = 5
    // x_re = (1 - 4)/5 = -0.6, x_im = (-2 - 2)/5 = -0.8
    // result.re = logHypot(-0.6, -0.8)/2 = log(1)/2 = 0
    // result.im = atan2(-0.8, -0.6)/2
    const result = new Complex(0, 0.5).acoth();
    const expected_im = Math.atan2(-0.8, -0.6) / 2;
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(expected_im, 10);
  });
});