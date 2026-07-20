import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate acsch correctly for a complex number with non-zero real and imaginary parts', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(1, 1).acsch();
    const resultMutated = new Complex(1, 1).acsch();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 10);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 10);
  });
});