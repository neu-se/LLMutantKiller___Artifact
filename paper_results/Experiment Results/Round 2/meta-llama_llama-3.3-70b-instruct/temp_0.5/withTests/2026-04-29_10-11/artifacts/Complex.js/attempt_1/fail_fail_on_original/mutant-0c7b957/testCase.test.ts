import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating atanh with mutated code', () => {
    const complex = new Complex(2, 2);
    expect(() => complex.atanh()).toThrowError(SyntaxError);
  });
});