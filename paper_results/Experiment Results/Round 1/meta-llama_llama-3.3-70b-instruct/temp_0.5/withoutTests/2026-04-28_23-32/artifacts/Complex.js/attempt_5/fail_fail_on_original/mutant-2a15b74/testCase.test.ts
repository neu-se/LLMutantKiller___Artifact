import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate division of two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    const result = c1.div(c2);
    const expectedReal = (1 * 3 + 2 * 4) / (3 * 3 + 4 * 4);
    const expectedImaginary = (2 * 3 - 1 * 4) / (3 * 3 + 4 * 4);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
    // Add an additional check to verify the calculation of t
    const x = c2.re / c2.im;
    const t = c2.re / x + c2.im;
    expect(t).toBeCloseTo(c2.re / x + c2.im);
  });
});