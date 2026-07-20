import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 for a small complex number', () => {
    const complex = new Complex(1e-8, 1e-8);
    const result = complex.expm1();
    const expectedReal = Math.exp(1e-8) * Math.cos(1e-8) - 1;
    const expectedImaginary = Math.exp(1e-8) * Math.sin(1e-8);
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImaginary, 10);
  });
});