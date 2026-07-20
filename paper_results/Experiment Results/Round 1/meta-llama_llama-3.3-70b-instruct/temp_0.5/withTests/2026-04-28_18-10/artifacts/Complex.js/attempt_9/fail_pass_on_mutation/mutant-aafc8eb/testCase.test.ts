import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly for small values', () => {
    const x = 0.000001;
    const complex = new Complex(x);
    const xx = x * x;
    const result = xx * (xx * (xx * (xx * (xx / 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320);
    const expected = complex.cos().sub(1);
    expect(Math.abs(result - expected.re) < 1e-12).toBe(true);
  });
});