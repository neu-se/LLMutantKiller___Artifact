import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should handle addition with two infinite complex numbers correctly', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 0);
    const result = c1.add(c2);
    expect(result.equals(Complex['INFINITY'])).toBe(true);
  });
});