import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle addition with infinite values correctly', () => {
    const complex1 = new Complex(Infinity, 0);
    const complex2 = new Complex(1, 0);
    const result = complex1.add(complex2);
    expect(result).toEqual(Complex['INFINITY']);
  });
});