import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number addition with infinity', () => {
  it('should return Infinity when adding a finite number to Infinity', () => {
    const finite = new Complex(5, 0);
    const infinite = Complex.INFINITY;
    const result = finite.add(infinite);
    expect(result).toEqual(Complex.INFINITY);
  });
});