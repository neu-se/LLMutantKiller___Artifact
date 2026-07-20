import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when an object with an empty string key is provided', () => {
    expect(() => new Complex({ "": 1 })).toThrowError(SyntaxError);
  });
});