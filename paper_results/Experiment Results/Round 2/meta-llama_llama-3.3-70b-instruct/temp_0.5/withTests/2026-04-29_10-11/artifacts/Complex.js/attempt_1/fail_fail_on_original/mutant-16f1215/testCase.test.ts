import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when dividing by zero in acsc function', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsc()).toThrow(SyntaxError);
  });
});