import { Complex } from './complex';

describe('Complex.js', () => {
  it('should correctly handle multiplication of zero and infinite complex numbers', () => {
    const c1 = new Complex(0, 0);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.mul(c2);
    expect(result.isNaN()).toBe(true);
  });
});