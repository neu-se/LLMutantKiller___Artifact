import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number addition with infinity', () => {
  it('should return Infinity when adding Infinity to a finite complex number', () => {
    const finite = new Complex(2, 3);
    const infinite = Complex.INFINITY;
    const result = finite.add(infinite);
    expect(result.isInfinite()).toBe(true);
  });
});