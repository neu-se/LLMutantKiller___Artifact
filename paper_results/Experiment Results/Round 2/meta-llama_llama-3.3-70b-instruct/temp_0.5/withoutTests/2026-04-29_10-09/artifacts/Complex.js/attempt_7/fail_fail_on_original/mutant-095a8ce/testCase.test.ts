import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asec when input is a complex number with a non-zero real part', () => {
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(Infinity);
  });
});