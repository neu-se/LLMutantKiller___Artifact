import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle isZero', () => {
    const complex = new Complex(0, 0);
    expect(complex.isZero()).toBe(true);
    const complex2 = new Complex(Infinity, 0);
    const zero = new Complex(0, 0);
    const result = complex2.mul(zero, 0);
    expect(result.isNaN()).toBe(true);
  });
});