import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when asech is called with a complex number that has a real part of 0.5 and an imaginary part of 0', () => {
    const complex = new Complex(0.5, 0);
    expect(() => complex.asech()).not.toThrow();
  });
});