import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when the denominator is zero in the acsch method', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrow(SyntaxError);
  });
});