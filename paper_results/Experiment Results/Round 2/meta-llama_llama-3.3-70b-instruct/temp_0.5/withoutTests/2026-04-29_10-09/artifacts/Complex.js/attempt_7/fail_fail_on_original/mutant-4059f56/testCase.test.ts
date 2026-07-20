import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when accessing an undefined property in the clone method', () => {
    const complex = new Complex(1, 2);
    const clonedComplex = complex.clone();
    expect(() => clonedComplex[""]).toThrowError();
  });
});