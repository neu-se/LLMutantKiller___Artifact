import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing an object with only one of "re" or "im" properties', () => {
    expect(() => new Complex({ re: 1 })).toThrow(SyntaxError);
    expect(() => new Complex({ im: 1 })).toThrow(SyntaxError);
  });
});