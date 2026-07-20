import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const complex = new Complex(1, 1);
    const sec = complex.sec();
    expect(sec.re).toBeCloseTo(Math.cos(1) * cosh(1) / (0.5 * cosh(2) + 0.5 * Math.cos(2)), 10);
  });
});