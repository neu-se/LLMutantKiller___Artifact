import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle zero and infinity in multiplication', () => {
    const zero = new Complex(0, 0);
    const infinity = new Complex(Infinity, Infinity);
    const result1 = infinity.mul(zero);
    const result2 = zero.mul(infinity);
    expect(result1).toEqual(Complex['NAN']);
    expect(result2).toEqual(Complex['NAN']);
  });
});