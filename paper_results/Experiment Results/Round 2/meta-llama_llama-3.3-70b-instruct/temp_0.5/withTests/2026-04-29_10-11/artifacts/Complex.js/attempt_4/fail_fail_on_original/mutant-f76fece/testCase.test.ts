import { Complex } from "../../complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1.000000000000001, 1.000000000000001);
    expect(c1.equals(c2.re, c2.im)).toBe(true);
    const c3 = new Complex(1.000000000000001, 1.000000000000002);
    expect(c1.equals(c3.re, c3.im)).toBe(true);
  });
});