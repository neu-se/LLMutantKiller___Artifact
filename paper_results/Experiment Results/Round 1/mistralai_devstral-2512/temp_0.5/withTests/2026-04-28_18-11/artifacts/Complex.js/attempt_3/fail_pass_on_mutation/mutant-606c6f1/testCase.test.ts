import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number addition with infinity', () => {
  it('should return Infinity when adding two infinite complex numbers', () => {
    const infinite1 = Complex.INFINITY;
    const infinite2 = Complex.INFINITY;
    const result = infinite1.add(infinite2);
    expect(result.isNaN()).toBe(true);
  });
});