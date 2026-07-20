import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly calculate division of two complex numbers', () => {
    const c1 = new Complex(4, 3);
    const c2 = new Complex(1, 2);
    const result = c1.div(c2);
    const expectedReal = (4 * 1 + 3 * 2) / (1 * 1 + 2 * 2);
    const expectedImaginary = (3 * 1 - 4 * 2) / (1 * 1 + 2 * 2);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
    const c3 = new Complex(1, 1);
    const c4 = new Complex(2, 2);
    const result2 = c3.div(c4);
    const expectedReal2 = (1 * 2 + 1 * 2) / (2 * 2 + 2 * 2);
    const expectedImaginary2 = (1 * 2 - 1 * 2) / (2 * 2 + 2 * 2);
    expect(result2.re).toBeCloseTo(expectedReal2);
    expect(result2.im).toBeCloseTo(expectedImaginary2);
  });
});