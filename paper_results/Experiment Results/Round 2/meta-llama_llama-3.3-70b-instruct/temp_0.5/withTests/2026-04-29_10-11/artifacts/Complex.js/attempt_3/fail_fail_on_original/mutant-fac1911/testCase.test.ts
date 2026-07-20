import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should return the correct result for the acsch function', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    const expected = new Complex(1, 2);
    var d = expected.re * expected.re + expected.im * expected.im;
    const asinhResult = new Complex(expected.re / d, -expected.im / d).asinh();
    expect(Math.abs(result.re - asinhResult.re)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - asinhResult.im)).toBeLessThan(1e-10);
  });
});