import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication of zero and infinite complex numbers', () => {
    const c1 = new Complex(0, 0);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.mul(c2);
    expect(result.equals(Complex['NAN'])).toBe(true);
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(0, 0);
    const result2 = c3.mul(c4);
    expect(result2.equals(Complex['NAN'])).toBe(true);
    expect(c1.mul(c2).equals(c3.mul(c4))).toBe(true);
  });
});