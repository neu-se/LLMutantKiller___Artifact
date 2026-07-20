import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate asec for a complex number with non-zero real part and zero imaginary part', () => {
    const complex = new Complex(1, 0);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(complex.asec().re).not.toBe(complex.asec().im);
  });
});