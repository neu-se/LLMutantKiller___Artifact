import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should throw an error when calling acsch on a complex number', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.acsch()).toThrowError();
  });
});