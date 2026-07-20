import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when asech is called with a non-zero real part', () => {
    const complex = new Complex(1, 0);
    expect(() => complex.asech()).toThrowError();
  });
});