import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate sec correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sec();
    const expectedReal = 0.2718281828459045;
    const expectedImaginary = -0.2718281828459045;
    expect(result.re).toBeCloseTo(expectedReal, 5);
    expect(result.im).toBeCloseTo(expectedImaginary, 5);
  });
});