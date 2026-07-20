import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when creating a Complex object with an object that has either "im" or "re" property but not both', () => {
    expect(() => new Complex({ im: 1 })).toThrow(SyntaxError);
    expect(() => new Complex({ re: 1 })).toThrow(SyntaxError);
  });
});