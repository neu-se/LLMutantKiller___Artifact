import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should throw an error when calculating asec for a complex number with zero real and imaginary parts in the original code but not in the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asec()).toThrowError();
  });
});