import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when asech is called with a complex number that has a real part of zero and an imaginary part of zero', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asech()).toThrow();
  });
});