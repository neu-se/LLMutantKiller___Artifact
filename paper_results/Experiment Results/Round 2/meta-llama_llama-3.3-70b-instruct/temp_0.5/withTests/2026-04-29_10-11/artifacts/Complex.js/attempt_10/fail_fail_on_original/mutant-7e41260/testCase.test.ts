import { Complex } from '../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate the division of two complex numbers', () => {
    const c1 = new Complex(1, 2);
    const c2 = new Complex(2, 1);
    const result = c1.div(c2);
    const expectedReal = (1 * 2 + 2 * 1) / (2 * 2 + 1 * 1);
    const expectedImaginary = (2 * 2 - 1 * 1) / (2 * 2 + 1 * 1);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
  });
});