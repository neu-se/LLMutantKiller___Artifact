import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when attempting to divide by zero in acsc', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsc()).toThrowError(SyntaxError);
  });
});