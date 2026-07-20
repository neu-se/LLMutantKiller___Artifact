import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should handle multiplication with zero and infinity correctly', () => {
    const c1 = new Complex(0, 0);
    const c2 = new Complex(Infinity, 0);
    const result = c1.mul(c2);
    expect(result.equals(Complex['NAN'])).toBe(true);
  });
});