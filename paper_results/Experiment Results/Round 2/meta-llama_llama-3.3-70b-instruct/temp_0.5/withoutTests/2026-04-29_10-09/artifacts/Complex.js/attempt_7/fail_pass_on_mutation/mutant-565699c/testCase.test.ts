import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly for very small values', () => {
    const x = 1e-16;
    const complex = new Complex(x);
    const result = complex.cos().sub(new Complex(1, 0));
    const expected = new Complex(Math.cos(x) - 1, 0);
    expect(Math.abs(result.re - expected.re) > 1e-12).toBe(false);
  });
});