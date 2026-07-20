import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return NaN when subtracting two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.sub(c2);
    expect(result.isNaN()).toBe(true);
    const c3 = new Complex(1, 1);
    const result2 = c1.sub(c3);
    expect(result2.isInfinite()).toBe(true);
  });
});