import { Complex } from '../../complex';

describe('Complex.js', () => {
  it('should correctly calculate cosm1 for small values of x', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const result = complex.expm1().re;
    const expected = Math.expm1(x);
    expect(Math.abs(result - expected)).toBeLessThan(1e-5);
  });
});