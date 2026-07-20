import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    const expectedReal = 2 * Math.cosh(1) * Math.cos(1) / (Math.cos(2) + Math.cosh(2));
    const expectedImaginary = -2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2) + Math.cosh(2));
    expect(result.re).toBeCloseTo(expectedReal, 5);
    expect(result.im).toBeCloseTo(expectedImaginary, 5);
  });
});