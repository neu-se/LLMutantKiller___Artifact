import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number addition with infinity', () => {
  it('should return Infinity when adding Infinity to a finite complex number', () => {
    const finite = new Complex(3, 4);
    const infinite = Complex.INFINITY;
    const result = infinite.add(finite);
    expect(result.isInfinite()).toBe(true);
    // This assertion will fail in the mutated version because it will try to add Infinity + finite
    // which would result in NaN due to Infinity + finite number being undefined behavior
    expect(result.re).not.toBe(NaN);
    expect(result.im).not.toBe(NaN);
  });
});