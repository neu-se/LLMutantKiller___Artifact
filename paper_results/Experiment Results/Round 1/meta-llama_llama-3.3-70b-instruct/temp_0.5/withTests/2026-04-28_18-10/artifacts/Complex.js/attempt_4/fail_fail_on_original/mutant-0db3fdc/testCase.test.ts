import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should correctly calculate cosm1', () => {
    const complex = new Complex(0.1);
    const result = complex.expm1().re;
    const expected = Math.expm1(0.1);
    expect(Math.abs(result - expected)).toBeLessThan(1e-10);
  });
});