import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return correct result when subtracting two complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 1);
    const result = c1.sub(c2);
    expect(result.isInfinite()).toBe(true);
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(Infinity, Infinity);
    expect(c3.sub(c4).isNaN()).toBe(true);
  });
});