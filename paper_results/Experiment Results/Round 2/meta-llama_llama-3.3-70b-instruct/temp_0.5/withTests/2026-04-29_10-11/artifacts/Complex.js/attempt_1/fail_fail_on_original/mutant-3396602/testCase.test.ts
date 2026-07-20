import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating the cosecans of a complex number with the mutated code', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.csc()).toThrowError();
  });
});