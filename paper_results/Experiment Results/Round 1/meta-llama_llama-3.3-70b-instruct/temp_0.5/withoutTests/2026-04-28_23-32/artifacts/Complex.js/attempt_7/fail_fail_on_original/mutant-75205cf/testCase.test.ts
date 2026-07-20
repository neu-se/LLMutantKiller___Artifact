import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return correct result when subtracting Infinity from a finite number', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.sub(c2.re, c2.im);
    expect(result.isInfinite()).toBe(true);
  });
});