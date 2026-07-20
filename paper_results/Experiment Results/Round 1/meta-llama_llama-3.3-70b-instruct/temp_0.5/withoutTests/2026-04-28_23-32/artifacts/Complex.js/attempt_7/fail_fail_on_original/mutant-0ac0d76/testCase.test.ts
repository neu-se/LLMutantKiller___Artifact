import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the natural log correctly for positive real numbers', () => {
    const complex = new Complex(1, 0);
    const result = complex.log();
    expect(result.re).toBeCloseTo(0);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.log();
    expect(result2.re).toBeCloseTo(0);
    const complex3 = new Complex(-1, 0);
    const result3 = complex3.log();
    expect(result3.re).not.toBeCloseTo(0);
  });
});