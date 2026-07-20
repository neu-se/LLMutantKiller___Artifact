import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct result for acoth function with non-zero denominator', () => {
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(complex.acoth().re).not.toEqual(complex.acoth().im);
  });
});