import { Complex } from './complex';

describe('Complex.js', () => {
  it('should return the correct result for the acsch function', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    const originalResult = new Complex(1, 2);
    var d = originalResult.re * originalResult.re + originalResult.im * originalResult.im;
    const asinhResult = new Complex(originalResult.re / d, -originalResult.im / d).asinh();
    expect(Math.abs(result.re - asinhResult.re)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - asinhResult.im)).toBeLessThan(1e-10);
  });
});