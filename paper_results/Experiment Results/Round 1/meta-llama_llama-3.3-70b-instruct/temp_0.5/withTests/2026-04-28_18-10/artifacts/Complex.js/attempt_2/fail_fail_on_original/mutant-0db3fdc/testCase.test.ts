import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should correctly calculate cosm1', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const result = complex.expm1().re;
    const expected = Math.expm1(x) * Math.cos(0) + (x * x / 2 - x * x * x * x / 24 + x * x * x * x * x * x / 720 - x * x * x * x * x * x * x * x / 40320);
    expect(Math.abs(result - expected)).toBeLessThan(1e-10);
  });
});