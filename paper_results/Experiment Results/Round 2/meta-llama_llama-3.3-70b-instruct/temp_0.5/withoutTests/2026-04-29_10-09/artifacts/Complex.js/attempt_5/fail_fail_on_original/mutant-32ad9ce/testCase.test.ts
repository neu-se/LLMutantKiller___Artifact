import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when both real and imaginary parts are NaN', () => {
    expect(() => new Complex(NaN, NaN)).toThrow(SyntaxError);
  });
});