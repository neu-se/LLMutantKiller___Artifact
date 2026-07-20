import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calling acosh with an empty string', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.acosh()).toThrowError(SyntaxError);
  });
});