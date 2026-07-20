import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when calculating atanh with b equal to zero', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.atanh()).toThrowError();
  });
});