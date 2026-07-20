import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number addition with infinity', () => {
  it('should return Infinity when adding Infinity to a finite number', () => {
    const finite = new Complex(0, 0);
    const infinite = Complex.INFINITY;
    const result = infinite.add(finite);
    expect(result.isInfinite()).toBe(true);
    expect(result).toEqual(Complex.INFINITY);
  });
});