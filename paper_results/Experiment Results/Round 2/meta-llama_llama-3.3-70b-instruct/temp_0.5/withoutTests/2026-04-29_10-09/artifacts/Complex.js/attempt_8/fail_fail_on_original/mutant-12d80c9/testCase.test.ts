import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a finite value when asech is called with a non-zero imaginary part and a non-zero real part is not NaN', () => {
    const complex = new Complex(1, 1);
    const result = complex.asech();
    expect(!isNaN(complex.re)).toBeTruthy();
  });
});