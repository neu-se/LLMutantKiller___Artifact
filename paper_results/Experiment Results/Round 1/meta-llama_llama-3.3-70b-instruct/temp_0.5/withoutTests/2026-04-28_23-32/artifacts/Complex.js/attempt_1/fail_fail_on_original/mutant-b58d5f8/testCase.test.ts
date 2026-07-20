import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an invalid string', () => {
    expect(() => new Complex('invalid')).toThrow(SyntaxError);
  });
});