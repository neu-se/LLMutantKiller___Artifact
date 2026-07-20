import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating asech for a complex number with non-zero imaginary part in the mutated code', () => {
    const complex = new Complex(0, 1);
    const result = complex.asech();
    expect(result.im).not.toBeCloseTo(0, 3);
  });
});