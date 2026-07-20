import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should correctly handle division by zero and infinity', () => {
    const c1 = new Complex(0, 0);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.div(c2).equals(Complex.ZERO)).toBe(true);
  });
});