import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication of zero and infinite complex numbers', () => {
    const c1 = new Complex(0, 0);
    const c2 = new Complex(Infinity, Infinity);
    const result1 = c1.mul(c2);
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(0, 0);
    const result2 = c3.mul(c4);
    expect(result1.equals(result2)).toBe(true);
  });
});