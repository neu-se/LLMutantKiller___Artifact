import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly calculate asinh', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalRe = complex.re;
    const originalIm = complex.im;
    complex.re = -complex.im;
    complex.im = originalRe;
    const expected = complex.asin();
    complex.re = originalRe;
    complex.im = originalIm;
    expected.re = -expected.im;
    expected.im = originalRe;
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});