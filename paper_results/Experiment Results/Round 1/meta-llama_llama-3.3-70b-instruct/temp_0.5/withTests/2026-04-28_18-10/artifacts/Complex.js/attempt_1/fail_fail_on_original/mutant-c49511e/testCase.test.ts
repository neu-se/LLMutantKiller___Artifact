import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should throw an error when trying to calculate the cosecans of a complex number with an invalid imaginary part', () => {
    const complexNumber = new Complex(1, 2);
    const csc = complexNumber.csc;
    expect(() => csc()).toThrowError(SyntaxError);
  });
});