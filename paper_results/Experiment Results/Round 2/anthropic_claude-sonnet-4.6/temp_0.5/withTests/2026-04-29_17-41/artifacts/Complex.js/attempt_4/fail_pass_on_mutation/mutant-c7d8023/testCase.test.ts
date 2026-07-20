import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsch', () => {
  it('returns correct imaginary part for acsch of complex number with zero real part and non-zero imaginary', () => {
    // Use a = 0, b = 0.5: d = 0.25, goes to (d !== 0) branch
    // Returns (0/0.25, -0.5/0.25).asinh() = (0, -2).asinh()
    // asinh(0 - 2i) = -i * asin(2) 
    // asin(2) = pi/2 - i*log(2 + sqrt(3)) 
    // So asinh(0-2i) = -i*(pi/2 - i*log(2+sqrt(3))) = -log(2+sqrt(3)) - i*pi/2
    const result = new Complex(0, 0.5).acsch();
    const expected_re = -Math.log(2 + Math.sqrt(3));
    const expected_im = -Math.PI / 2;
    expect(result.re).toBeCloseTo(expected_re, 10);
    expect(result.im).toBeCloseTo(expected_im, 10);
  });
});