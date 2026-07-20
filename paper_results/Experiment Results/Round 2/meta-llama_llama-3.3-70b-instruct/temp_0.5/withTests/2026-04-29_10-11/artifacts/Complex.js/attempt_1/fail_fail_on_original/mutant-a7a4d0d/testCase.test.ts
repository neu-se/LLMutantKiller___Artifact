import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should return the correct acosh value', () => {
    const complex = new Complex(1, 1);
    const acoshValue = complex.acosh();
    expect(acoshValue.re).toBeCloseTo(1.3169578969248166);
    expect(acoshValue.im).toBeCloseTo(0.9045568943023819);
  });
});