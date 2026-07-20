import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for asech with a real part that is not zero and a non-zero imaginary part', () => {
    const complex = new Complex(1, 1);
    const result = complex.asech();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(complex.re).not.toBeNaN();
  });
});