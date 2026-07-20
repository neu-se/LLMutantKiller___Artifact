import { Complex } from "./complex";

describe('Complex', () => {
  it('should return correct result when subtracting two complex numbers', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.sub(c2);
    expect(result.isInfinite()).toBe(true);
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(1, 1);
    const result2 = c3.sub(c4);
    expect(result2.isInfinite()).toBe(true);
    const c5 = new Complex(Infinity, Infinity);
    const c6 = new Complex(Infinity, Infinity);
    expect(c5.sub(c6).isNaN()).toBe(true);
  });
});