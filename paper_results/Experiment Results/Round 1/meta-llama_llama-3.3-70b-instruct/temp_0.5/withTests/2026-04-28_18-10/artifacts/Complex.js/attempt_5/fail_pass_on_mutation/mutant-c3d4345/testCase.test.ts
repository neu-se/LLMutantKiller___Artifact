import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should correctly calculate asec for a complex number with zero real part and non-zero imaginary part', () => {
    const complex = new Complex(0, 1);
    const result = complex.asec();
    expect(result.im).not.toBe(Infinity);
  });
});