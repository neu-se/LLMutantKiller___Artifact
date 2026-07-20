import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex acosh correctly', () => {
    const complex = new Complex(2, 0);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(1, 1);
    const result2 = complex2.acosh();
    expect(result2.re).toBeGreaterThan(0);
    expect(result2.im).toBeGreaterThan(0);
  });
});