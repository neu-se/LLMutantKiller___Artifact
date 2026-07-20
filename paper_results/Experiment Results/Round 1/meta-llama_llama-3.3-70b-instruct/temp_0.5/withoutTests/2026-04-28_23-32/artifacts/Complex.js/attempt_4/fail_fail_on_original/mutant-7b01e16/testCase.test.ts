import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication of zero and infinite complex numbers', () => {
    const c1 = new Complex(0, 0);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.mul(c2).equals(Complex['NAN'])).toBe(true);
  });
});