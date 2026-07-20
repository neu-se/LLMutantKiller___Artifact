import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1, 0);
    expect(c1.equals(c2)).toBe(true);
    const c3 = new Complex(2, 0);
    expect(c1.equals(c3)).toBe(false);
    expect(c1.equals(c1)).toBe(true);
    expect(c2.equals(c2)).toBe(true);
    expect(c3.equals(c3)).toBe(true);
    expect(c1.equals(c3)).toBe(false);
    const c4 = new Complex(1.00001, 0);
    expect(c1.equals(c4)).toBe(true);
    const c5 = new Complex(1, 0.00001);
    expect(c1.equals(c5)).toBe(true);
    const c6 = new Complex(1.00001, 0.00001);
    expect(c1.equals(c6)).toBe(true);
  });
});