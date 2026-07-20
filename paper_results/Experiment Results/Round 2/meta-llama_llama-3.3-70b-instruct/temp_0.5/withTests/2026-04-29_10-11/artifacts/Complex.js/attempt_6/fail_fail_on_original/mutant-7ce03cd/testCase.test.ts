import { Complex } from '../complex';

describe('Complex', () => {
  it('should throw an error when trying to access the "isZero" property of a non-existent property in the "mul" method', () => {
    const zero = new Complex(0, 0);
    const infinity = new Complex(Infinity, 0);
    const result = zero.mul(infinity);
    expect(() => {
      const z = new Complex(infinity, zero);
      z.mul(zero, zero);
    }).toThrowError();
  });
});