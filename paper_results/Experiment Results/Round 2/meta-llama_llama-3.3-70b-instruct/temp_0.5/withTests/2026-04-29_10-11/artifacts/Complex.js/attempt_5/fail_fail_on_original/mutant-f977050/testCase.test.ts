import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex acosh correctly', () => {
    const complex = new Complex(Math.PI, 0);
    const result = complex.acosh();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI);
    const complex2 = new Complex(2, 0);
    const result2 = complex2.acosh();
    expect(result2.re).toBeGreaterThan(0);
    expect(result2.im).toBeCloseTo(0);
  });
});