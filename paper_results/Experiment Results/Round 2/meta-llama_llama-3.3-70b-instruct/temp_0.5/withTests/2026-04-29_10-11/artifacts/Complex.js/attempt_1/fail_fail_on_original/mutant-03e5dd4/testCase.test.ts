import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a complex number with a newline character', () => {
    expect(() => new Complex('1\n+2i')).toThrowError(SyntaxError);
  });
});