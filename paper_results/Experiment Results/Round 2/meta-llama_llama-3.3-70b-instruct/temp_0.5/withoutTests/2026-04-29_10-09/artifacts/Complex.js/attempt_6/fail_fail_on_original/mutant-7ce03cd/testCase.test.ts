import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication with zero and infinity', () => {
    const c1 = new Complex(0, 0);
    const c2 = new Complex(Infinity, Infinity);
    const result = c1.mul(c2);
    expect(result.equals(Complex['NAN'])).toBe(true);
  });
});