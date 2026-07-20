import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly calculate the division of two complex numbers', () => {
    const c1 = new Complex(2, 3);
    const c2 = new Complex(4, 5);
    const result = c1.div(c2);
    const expectedReal = (2 * 4 + 3 * 5) / (4 * 4 + 5 * 5);
    const expectedImaginary = (3 * 4 - 2 * 5) / (4 * 4 + 5 * 5);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
  });
});