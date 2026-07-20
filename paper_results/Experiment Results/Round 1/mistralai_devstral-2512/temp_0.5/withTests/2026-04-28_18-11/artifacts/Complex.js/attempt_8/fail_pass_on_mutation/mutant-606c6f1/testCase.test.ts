import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number addition with infinity', () => {
  it('should return Infinity when adding a finite complex number to Infinity', () => {
    const finite = new Complex(1, 2);
    const infinite = Complex.INFINITY;
    const result = infinite.add(finite);
    expect(result.isInfinite()).toBe(true);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
    expect(result).toEqual(Complex.INFINITY);
  });
});