import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return correct log value for a small positive real number', () => {
    const complex = new Complex(0, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(-Infinity);
    const complex2 = new Complex(1e-9, 0);
    const result2 = complex2.log();
    expect(result2.re).not.toBeCloseTo(result.re);
  });
});