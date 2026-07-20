import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return Infinity when subtracting a finite number from Infinity', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 1);
    const result = c1.sub(c2.re, c2.im);
    expect(result.isInfinite()).toBe(true);
  });
});