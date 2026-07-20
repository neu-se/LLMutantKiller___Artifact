import { Complex } from "./complex";

describe('Complex', () => {
  it('should correctly handle division by zero', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(0, 0);
    expect(c1.div(c2).equals(Complex['INFINITY'])).toBe(true);
    const c3 = new Complex(1, 0);
    const c4 = new Complex(1, 0);
    expect(c3.div(c4).equals(new Complex(1, 0))).toBe(true);
  });
});