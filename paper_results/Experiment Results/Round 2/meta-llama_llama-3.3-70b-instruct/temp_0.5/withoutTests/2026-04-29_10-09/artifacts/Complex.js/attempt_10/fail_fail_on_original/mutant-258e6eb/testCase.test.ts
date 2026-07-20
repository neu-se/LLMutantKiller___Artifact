import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate atanh for real numbers greater than 1 without negating the imaginary part', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    const expectedImaginary = 0;
    expect(result.im).toBeCloseTo(expectedImaginary);
    expect(result.im).not.toBeCloseTo(-expectedImaginary);
  });
});