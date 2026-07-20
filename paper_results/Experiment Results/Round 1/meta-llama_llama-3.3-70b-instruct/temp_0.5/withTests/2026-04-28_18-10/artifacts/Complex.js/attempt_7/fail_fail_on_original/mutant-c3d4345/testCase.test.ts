import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return Infinity for asec of a complex number with zero real and imaginary parts in the original code but not in the mutated code', () => {
    const complex = new Complex(0, 1);
    const result = complex.asec();
    expect(result.im).toBe(Infinity);
  });
});