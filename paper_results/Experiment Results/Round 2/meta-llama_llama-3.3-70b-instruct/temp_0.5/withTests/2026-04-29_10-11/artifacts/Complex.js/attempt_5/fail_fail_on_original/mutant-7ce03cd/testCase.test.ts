import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return NaN when trying to multiply zero with infinity', () => {
    const zero = new Complex(0, 0);
    const infinity = new Complex(Infinity, 0);
    const result = zero.mul(infinity);
    expect(result).toEqual(Complex.NAN);
  });
});