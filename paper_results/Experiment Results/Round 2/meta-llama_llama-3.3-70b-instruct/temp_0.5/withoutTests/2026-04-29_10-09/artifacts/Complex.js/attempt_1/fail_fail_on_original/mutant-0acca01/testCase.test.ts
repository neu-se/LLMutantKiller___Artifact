import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when acoth is called with a complex number that would cause a division by zero in the mutated code', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.acoth()).toThrow();
  });
});