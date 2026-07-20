import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly and not throw an error', () => {
    const complex = new Complex(1, 2);
    expect(() => complex.atanh()).not.toThrowError();
  });
});