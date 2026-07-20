import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle multiplication of zero and infinite complex numbers', () => {
    const c1 = new Complex(0, 0);
    const c2 = new Complex(Infinity, Infinity);
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(0, 0);
    expect(c1.mul(c2)).not.toEqual(c3.mul(c4));
  });
});