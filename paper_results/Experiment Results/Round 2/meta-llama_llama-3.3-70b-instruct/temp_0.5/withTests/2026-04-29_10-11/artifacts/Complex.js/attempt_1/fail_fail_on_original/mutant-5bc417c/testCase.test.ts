import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when acoth is called with a zero denominator', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acoth()).toThrowError(SyntaxError);
  });
});