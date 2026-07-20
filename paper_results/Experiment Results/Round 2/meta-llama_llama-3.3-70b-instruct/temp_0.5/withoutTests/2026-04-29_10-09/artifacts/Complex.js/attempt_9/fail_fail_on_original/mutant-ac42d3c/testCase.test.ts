import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating atan of a complex number with b = -1 and a = 0 in the mutated code', () => {
    const complex = new Complex(0, -1);
    expect(() => complex.atan()).toThrowError();
  });
});