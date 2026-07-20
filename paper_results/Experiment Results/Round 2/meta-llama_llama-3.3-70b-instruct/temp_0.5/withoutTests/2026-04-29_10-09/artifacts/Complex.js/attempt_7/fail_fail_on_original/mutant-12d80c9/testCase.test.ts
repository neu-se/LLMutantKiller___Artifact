import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a finite value when asech is called with a non-zero imaginary part', () => {
    const complex = new Complex(0, 1);
    const result = complex.asech();
    expect(isFinite(result.re)).toBeTruthy();
    expect(isFinite(result.im)).toBeTruthy();
  });
});