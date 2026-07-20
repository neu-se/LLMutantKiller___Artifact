import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result when subtracting Infinity from Infinity', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.sub(c2.re, c2.im);
    expect(result.isNaN()).toBe(true);
    const c3 = new Complex(1, 1);
    const c4 = new Complex(Infinity, Infinity);
    const result2 = c3.sub(c4.re, c4.im);
    expect(result2.isInfinite()).toBe(true);
  });
});