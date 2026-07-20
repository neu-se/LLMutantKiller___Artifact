import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when calculating atanh with a complex number (1,1)', () => {
    const complex = new Complex(1, 1);
    expect(() => complex.atanh()).not.toThrow();
  });
});