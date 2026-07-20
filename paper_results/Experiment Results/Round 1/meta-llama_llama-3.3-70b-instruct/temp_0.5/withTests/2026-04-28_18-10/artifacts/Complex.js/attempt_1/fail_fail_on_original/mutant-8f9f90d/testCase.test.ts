import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should throw an error when attempting to access a non-existent property', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.atanh()).not.toThrow();
    expect(() => complex[""]).toThrowError(SyntaxError);
  });
});