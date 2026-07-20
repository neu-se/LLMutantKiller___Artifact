import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return Infinity when trying to multiply infinity with non-zero', () => {
    const infinity = new Complex(Infinity, 0);
    const one = new Complex(1, 0);
    const result = infinity.mul(one);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});