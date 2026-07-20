import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const complex = new Complex(0, 1);
    const sec = complex.sec();
    const expectedReal = 1 / (0.5 * Math.cosh(2) + 0.5 * Math.cos(0));
    const expectedImaginary = Math.sin(0) * Math.sinh(1) / (0.5 * Math.cosh(2) + 0.5 * Math.cos(0));
    expect(sec.re).toBeCloseTo(expectedReal, 10);
    expect(sec.im).toBeCloseTo(expectedImaginary, 10);
  });
});