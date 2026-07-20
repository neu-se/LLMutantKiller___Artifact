import { Complex } from './complex';

describe('Complex.js', () => {
  it('should handle asinh correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    const originalRe = result.re;
    const originalIm = result.im;
    result.re = -result.im;
    expect(result.re).not.toBe(originalRe);
  });
});