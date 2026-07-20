import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should handle addition with infinity correctly', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.add(c2);
    expect(result.isInfinite()).toBe(true);
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(3, 4);
    const result2 = c3.add(c4);
    expect(result2.isInfinite()).toBe(true);
  });
});