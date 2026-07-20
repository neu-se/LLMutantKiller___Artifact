import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should not throw an error when calculating acosh', () => {
    const complex = new Complex(2, 0);
    const acosh = complex.acosh();
    expect(acosh.re).toBeGreaterThan(0);
    expect(acosh.im).toBeCloseTo(0, 10);
  });
});