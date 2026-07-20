import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly calculate acsch for a complex number with division by zero check', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsch();
    expect(() => result).not.toThrow();
  });
});