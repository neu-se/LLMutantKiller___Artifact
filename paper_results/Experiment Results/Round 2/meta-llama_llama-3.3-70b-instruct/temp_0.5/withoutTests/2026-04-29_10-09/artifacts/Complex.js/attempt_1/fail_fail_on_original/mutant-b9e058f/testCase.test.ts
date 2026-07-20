import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle addition with two infinite complex numbers correctly', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.add(c2);
    expect(result.equals(Complex['NAN'])).toBe(true);
  });
});