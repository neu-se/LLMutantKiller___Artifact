import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a complex number with a non-zero imaginary part for asec when called with a non-zero complex number', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.im).not.toBe(0);
  });
});