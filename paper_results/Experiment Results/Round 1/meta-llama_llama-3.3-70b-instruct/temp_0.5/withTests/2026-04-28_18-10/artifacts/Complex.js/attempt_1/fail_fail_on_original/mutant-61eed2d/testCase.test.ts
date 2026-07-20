import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should throw an error when creating a Complex object with an invalid property', () => {
    expect(() => new Complex({ "": 0 })).toThrowError(SyntaxError);
  });
});