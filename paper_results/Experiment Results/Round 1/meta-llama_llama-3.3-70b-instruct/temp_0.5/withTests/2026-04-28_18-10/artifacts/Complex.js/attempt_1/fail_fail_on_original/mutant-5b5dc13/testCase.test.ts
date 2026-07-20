import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating acsch with a !== 0 and b === 0', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.acsch()).toThrowError(SyntaxError);
  });
});