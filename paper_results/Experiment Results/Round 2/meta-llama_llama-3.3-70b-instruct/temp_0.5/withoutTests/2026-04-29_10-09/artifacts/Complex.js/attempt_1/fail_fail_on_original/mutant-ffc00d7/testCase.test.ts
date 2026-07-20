import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an invalid complex number string', () => {
    expect(() => new Complex('')).toThrowError(SyntaxError);
  });
});