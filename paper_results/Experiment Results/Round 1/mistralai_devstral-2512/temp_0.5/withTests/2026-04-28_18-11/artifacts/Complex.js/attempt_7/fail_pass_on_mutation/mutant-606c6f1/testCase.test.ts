import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number addition with infinity', () => {
  it('should return Infinity when adding a finite complex number to Infinity', () => {
    const finite = new Complex(2, 3);
    const infinite = Complex.INFINITY;
    const result = infinite.add(finite);
    expect(result).not.toEqual(Complex.ZERO);
    expect(result.isInfinite()).toBe(true);
  });
});