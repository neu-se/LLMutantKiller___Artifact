import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate acosh correctly', () => {
    const complex = new Complex(1, 1);
    const acosh = complex.acosh();
    expect(acosh.re).toBeCloseTo(1.3169578969248166, 10);
    expect(acosh.im).toBeCloseTo(0.9045568943023819, 10);
  });
});