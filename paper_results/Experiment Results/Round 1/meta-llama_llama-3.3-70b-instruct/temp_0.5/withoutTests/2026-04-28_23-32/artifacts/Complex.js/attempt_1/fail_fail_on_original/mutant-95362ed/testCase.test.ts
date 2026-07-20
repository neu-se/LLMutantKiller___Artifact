import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing', () => {
  it('should throw an error for invalid input', () => {
    expect(() => new Complex({})).toThrowError(SyntaxError);
  });
});