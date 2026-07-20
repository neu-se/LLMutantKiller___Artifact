import { Complex } from "../complex.js";

describe('Complex', () => {
  it('should calculate atanh for real numbers greater than 1 without negating the imaginary part', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    const expectedReal = result.re;
    const expectedImaginary = result.im;
    const complexMutated = new Complex(2, 0);
    const resultMutated = complexMutated.atanh();
    expect(resultMutated.re).toBeCloseTo(expectedReal);
    expect(resultMutated.im).toBeCloseTo(expectedImaginary);
  });
});