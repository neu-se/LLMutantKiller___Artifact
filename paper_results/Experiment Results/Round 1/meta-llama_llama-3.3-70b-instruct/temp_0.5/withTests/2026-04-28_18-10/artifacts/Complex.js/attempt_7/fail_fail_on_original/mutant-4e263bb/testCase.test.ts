import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when trying to access a defined property', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.re).not.toThrowError();
    expect(() => complex.im).not.toThrowError();
  });
});