import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate expm1 correctly for small values', () => {
    const x = 0.000001;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expectedReal = Math.expm1(x) * Math.cos(x) + Math.cos(x) - 1;
    const expectedImaginary = Math.exp(x) * Math.sin(x);
    expect(result.re).toBeCloseTo(expectedReal, 1e-15);
    expect(result.im).toBeCloseTo(expectedImaginary, 1e-15);
  });
});