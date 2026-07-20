import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly for a small input', () => {
    const x = 1e-8;
    const complex = new Complex(x);
    const cosm1 = complex.expm1().sub(complex);
    const expected = new Complex(Math.expm1(x) - Math.exp(x), 0);
    expect(cosm1.re).toBeCloseTo(expected.re, 10);
    expect(cosm1.im).toBeCloseTo(expected.im, 10);
  });
});