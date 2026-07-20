import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should correctly calculate cosm1 for small values of x', () => {
    const x = 0.00001;
    const complex = new Complex(x);
    const result = complex.expm1().re;
    const expected = x - Math.pow(x, 2) / 2 + Math.pow(x, 3) / 6 - Math.pow(x, 4) / 24 + Math.pow(x, 5) / 120 - Math.pow(x, 6) / 720 + Math.pow(x, 7) / 5040;
    expect(Math.abs(result - expected)).toBeLessThan(1e-10);
  });
});