import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number with zero denominator', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.acsch()).toThrowError(SyntaxError);
  });
});