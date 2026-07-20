import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex acosh correctly', () => {
    const complex = new Complex(Math.sqrt(2), 0);
    const acosh = complex.acosh();
    expect(acosh.re).toBeCloseTo(0.881, 3);
    expect(acosh.im).toBeCloseTo(0, 3);
  });
});