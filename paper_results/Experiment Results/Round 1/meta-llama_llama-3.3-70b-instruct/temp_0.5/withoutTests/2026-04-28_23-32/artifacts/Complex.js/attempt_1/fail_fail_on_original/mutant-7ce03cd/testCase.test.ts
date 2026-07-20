import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when trying to multiply by zero', () => {
    const complex = new Complex(1, 1);
    const zero = new Complex(0, 0);
    const infinite = new Complex(Infinity, Infinity);
    expect(() => complex.mul(infinite, zero)).toThrowError(SyntaxError);
  });
});