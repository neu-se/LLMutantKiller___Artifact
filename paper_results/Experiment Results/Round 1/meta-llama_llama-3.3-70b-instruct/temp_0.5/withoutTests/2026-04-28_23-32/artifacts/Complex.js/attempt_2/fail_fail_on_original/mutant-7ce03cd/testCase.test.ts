import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly multiply by zero', () => {
    const complex = new Complex(Infinity, Infinity);
    const zero = new Complex(0, 0);
    const result = complex.mul(zero);
    expect(result).toEqual(Complex['NAN']);
  });
});