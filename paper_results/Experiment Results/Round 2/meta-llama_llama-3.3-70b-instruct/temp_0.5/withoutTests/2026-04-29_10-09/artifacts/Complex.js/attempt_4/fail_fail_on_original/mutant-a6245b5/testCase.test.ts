import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating atanh for complex numbers with b === 0 in the mutated code', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.atanh()).toThrow();
  });
});