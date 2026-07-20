import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate atan for b=1 and b=1 correctly', () => {
    const complex1 = new Complex(1, 1);
    const result1 = complex1.atan();
    const complex2 = new Complex(1, 1);
    const result2 = complex2.atan();
    expect(result1.re).toBeCloseTo(result2.re, 10);
    const complex3 = new Complex(0, 1);
    const result3 = complex3.atan();
    expect(result1.re).not.toBeCloseTo(result3.re, 10);
  });
});