import { Complex } from "./complex";

describe('Complex', () => {
  it('should return Infinity when adding an infinite and a finite complex number', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 1);
    const result = c1.add(c2);
    expect(result.equals(Complex['INFINITY'])).toBe(true);
  });
});