import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should handle atanh correctly for b = 0 and b != 0', () => {
    const complex1 = new Complex(1, 0);
    const complex2 = new Complex(1, 1);
    const result1 = complex1.atanh();
    const result2 = complex2.atanh();
    expect(result1.im).toBeCloseTo(0);
    expect(result2.im).not.toBeCloseTo(0);
    expect(complex1.atanh().im).not.toBe(complex2.atanh().im);
    expect(complex1.atanh().re).toBeCloseTo(complex2.atanh().re);
  });
});