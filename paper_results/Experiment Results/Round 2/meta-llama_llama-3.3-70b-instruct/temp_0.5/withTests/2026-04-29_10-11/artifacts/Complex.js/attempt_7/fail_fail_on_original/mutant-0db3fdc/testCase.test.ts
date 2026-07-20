import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly calculate cosm1', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const result = complex.expm1().re - x;
    const expected = Math.cos(x) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});