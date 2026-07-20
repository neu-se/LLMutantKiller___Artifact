import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when trying to multiply by zero and check for infinity', () => {
    const complex = new Complex(Infinity, 0);
    const zero = new Complex(0, 0);
    expect(() => complex.mul(zero, 0)).toThrowError(SyntaxError);
  });
});