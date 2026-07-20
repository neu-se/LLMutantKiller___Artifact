import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when parsing a complex number with NaN real and imaginary parts', () => {
    expect(() => new Complex({ re: NaN, im: 1 })).toThrow(SyntaxError);
    expect(() => new Complex({ re: 1, im: NaN })).toThrow(SyntaxError);
  });
});