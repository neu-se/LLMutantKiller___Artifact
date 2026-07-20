import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sech', () => {
  it('sech computed correctly using imaginary part', () => {
    // Use a value where im part matters significantly
    // sech(1 + 2i): with correct b=2, d = cos(4) + cosh(2)
    const c = new Complex(1, 2);
    const result = c['sech']();
    const a = 1, b = 2;
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});