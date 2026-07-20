import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return NaN when subtracting two infinite complex numbers', () => {
    const c1 = new Complex('Infinity+Infinity');
    const c2 = new Complex('Infinity+Infinity');
    const result = c1.sub(c1, c2);
    expect(result.equals(Complex['NAN'])).toBe(true);
  });
});