import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should correctly handle division by zero', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(0, 0);
    expect(c1.div(c2).equals(Complex['INFINITY'])).toBe(true);
  });
});