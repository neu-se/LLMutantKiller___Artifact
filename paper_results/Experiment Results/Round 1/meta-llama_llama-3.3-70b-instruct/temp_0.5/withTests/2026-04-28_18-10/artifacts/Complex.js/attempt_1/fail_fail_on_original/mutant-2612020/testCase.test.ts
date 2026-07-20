import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a complex number with an empty property', () => {
    expect(() => new Complex({ "": 0 })).toThrowError(SyntaxError);
  });
});