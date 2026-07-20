import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate the division of two complex numbers', () => {
    const c1 = new Complex(4, 3);
    const c2 = new Complex(2, 1);
    const result = c1.div(c2);
    const expectedReal = (4 * 2 + 3 * 1) / (2 * 2 + 1 * 1);
    const expectedImaginary = (3 * 2 - 4 * 1) / (2 * 2 + 1 * 1);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
  });
});