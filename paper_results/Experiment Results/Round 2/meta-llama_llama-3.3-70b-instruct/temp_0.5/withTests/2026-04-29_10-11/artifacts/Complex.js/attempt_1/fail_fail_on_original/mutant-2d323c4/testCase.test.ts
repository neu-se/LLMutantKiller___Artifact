import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when trying to calculate acsch of a complex number with d equal to 0', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrowError(SyntaxError);
  });
});