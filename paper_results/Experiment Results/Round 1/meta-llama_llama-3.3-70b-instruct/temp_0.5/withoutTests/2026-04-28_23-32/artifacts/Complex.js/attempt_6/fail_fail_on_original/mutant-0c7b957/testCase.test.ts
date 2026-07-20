import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atanh correctly for complex number (1.5, 2) and not be Infinity', () => {
    const complex = new Complex(1.5, 2);
    const result = complex.atanh();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
  });
});