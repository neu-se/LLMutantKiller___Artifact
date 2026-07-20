import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when calling asec on a complex number', () => {
    const complex = new Complex(2, 0);
    expect(() => complex.asec()).not.toThrow();
  });
});