import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const a = 1;
    const b = 0;
    const c = new Complex(a, b);
    const result = c.sec();
    const expectedReal = 1 / Math.cos(a);
    const expectedImaginary = 0;
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImaginary, 10);
  });
});