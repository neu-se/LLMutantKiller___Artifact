import { Complex } from "./complex";

describe('Complex', () => {
  it('should not return Infinity when adding two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.add(c2);
    expect(result.equals(Complex['INFINITY'])).toBe(false);
  });
});