import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly handle zero and infinity in multiplication', () => {
    const zero = new Complex(0, 0);
    const infinity = new Complex(Infinity, Infinity);
    const result1 = infinity.mul(zero);
    const result2 = zero.mul(infinity);
    expect(result1.equals(Complex['NAN'])).toBe(true);
    expect(result2.equals(Complex['NAN'])).toBe(true);
  });
});