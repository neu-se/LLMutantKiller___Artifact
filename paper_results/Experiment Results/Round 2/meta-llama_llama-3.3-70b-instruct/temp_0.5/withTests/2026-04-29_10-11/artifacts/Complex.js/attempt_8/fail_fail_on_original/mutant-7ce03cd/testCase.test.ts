import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should return correct result when multiplying zero with infinity', () => {
    const zero = new Complex(0, 0);
    const infinity = new Complex(Infinity, 0);
    const result = zero.mul(infinity);
    expect(result).toEqual(Complex.NAN);
  });
});