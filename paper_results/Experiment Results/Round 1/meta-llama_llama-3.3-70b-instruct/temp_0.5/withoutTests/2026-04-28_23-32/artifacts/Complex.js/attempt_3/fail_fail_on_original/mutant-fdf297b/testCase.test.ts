import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result when subtracting infinite complex number from finite complex number', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.sub(c2);
    expect(result.isInfinite()).toBe(true);
  });
});