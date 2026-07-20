import { Complex } from "../complex";

describe('Complex', () => {
  it('should handle addition of two complex numbers where one is infinite', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 0);
    const result = c1.add(c2);
    expect(result.equals(Complex['INFINITY'])).toBe(true);
  });
});