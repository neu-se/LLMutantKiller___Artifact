import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for non-zero values', () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const expectedRe = c.re / (c.re * c.re + c.im * c.im);
    const expectedIm = -c.im / (c.re * c.re + c.im * c.im);
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});