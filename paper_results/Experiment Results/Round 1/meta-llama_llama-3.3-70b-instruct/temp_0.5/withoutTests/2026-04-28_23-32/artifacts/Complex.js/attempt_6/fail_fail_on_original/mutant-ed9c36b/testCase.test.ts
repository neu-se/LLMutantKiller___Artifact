import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate sec correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sec();
    const originalResult = new Complex(
      0.2718281828459045,
      -0.2718281828459045
    );
    expect(result.re).toBeCloseTo(originalResult.re, 5);
    expect(result.im).toBeCloseTo(originalResult.im, 5);
  });
});