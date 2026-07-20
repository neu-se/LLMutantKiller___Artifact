import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly for small values', () => {
    const x = 1e-6;
    const expected = Math.cos(x) - 1;
    const complex = new Complex(x);
    const result = complex.cos().sub(new Complex(1, 0));
    expect(Math.abs(result.re - expected) < 1e-12).toBe(true);
  });
});