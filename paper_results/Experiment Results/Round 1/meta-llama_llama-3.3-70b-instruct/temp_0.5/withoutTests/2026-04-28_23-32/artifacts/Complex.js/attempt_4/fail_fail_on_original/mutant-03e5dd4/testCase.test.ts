import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an empty string', () => {
    expect(() => new Complex('')).toThrow(SyntaxError);
  });
});