import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 for a specific complex number', () => {
    const complex = new Complex(0.01, 0.01);
    const result = complex.expm1();
    const expectedReal = Math.exp(0.01) * Math.cos(0.01) - 1;
    const expectedImaginary = Math.exp(0.01) * Math.sin(0.01);
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImaginary, 10);
    const diff = Math.abs(result.re - expectedReal) + Math.abs(result.im - expectedImaginary);
    expect(diff).toBeLessThan(1e-9);
  });
});