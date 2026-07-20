import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const a = 1;
    const b = 1;
    const c = new Complex(a, b);
    const result = c.sec();
    const expectedReal = (Math.cos(a) * cosh(b)) / (0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a));
    const expectedImaginary = Math.sin(a) * sinh(b) / (0.5 * cosh(2 * b) + 0.5 * Math.cos(2 * a));
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImaginary, 10);
  });
});