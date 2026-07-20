import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.sec();
    const originalResult = new Complex(
      Math.cos(1) * cosh(2) / (0.5 * cosh(4) + 0.5 * Math.cos(2)),
      Math.sin(1) * sinh(2) / (0.5 * cosh(4) + 0.5 * Math.cos(2))
    );
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});