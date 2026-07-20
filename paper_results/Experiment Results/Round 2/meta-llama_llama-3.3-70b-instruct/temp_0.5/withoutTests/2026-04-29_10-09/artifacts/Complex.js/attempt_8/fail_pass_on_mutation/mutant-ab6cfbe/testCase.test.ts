import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct log value for zero and a small positive real number', () => {
    const complex = new Complex(0, 0);
    const result = complex.log();
    const complex2 = new Complex(1e-16, 0);
    const result2 = complex2.log();
    expect(result.re).not.toBeCloseTo(result2.re);
  });
});