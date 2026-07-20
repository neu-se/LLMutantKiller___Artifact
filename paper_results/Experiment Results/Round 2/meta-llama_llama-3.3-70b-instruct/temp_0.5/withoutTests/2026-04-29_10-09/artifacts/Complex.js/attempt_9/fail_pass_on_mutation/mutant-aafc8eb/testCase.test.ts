import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 for a small input', () => {
    const x = 0.000001;
    const complex = new Complex(x);
    const cosm1 = complex.expm1().re;
    const expected = Math.expm1(x);
    expect(cosm1).toBeCloseTo(expected, 15);
  });
});