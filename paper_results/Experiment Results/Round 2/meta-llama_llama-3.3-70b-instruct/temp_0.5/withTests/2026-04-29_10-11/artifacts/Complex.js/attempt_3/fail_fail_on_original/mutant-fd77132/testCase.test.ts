import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a complex number when calling asec on a complex number', () => {
    const complex = new Complex(2, 0);
    const result = complex.asec();
    expect(result).toBeInstanceOf(Complex);
  });
});