import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle isInfinite and isZero', () => {
    const infinity = new Complex(Infinity, 0);
    const zero = new Complex(0, 0);
    expect(infinity.isInfinite()).toBe(true);
    expect(zero.isZero()).toBe(true);
    const result = infinity.mul(zero, 0);
    expect(result.isNaN()).toBe(true);
  });
});