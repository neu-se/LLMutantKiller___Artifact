import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should not throw an error when asech is called with zero real part', () => {
    const complex = new Complex(0, 1);
    expect(() => complex.asech()).not.toThrow();
  });
});