import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating csc with mutated code', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.csc()).toThrowError(SyntaxError);
  });
});