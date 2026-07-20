import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const c = new Complex(1, 1);
    const result = c.sec();
    const originalResult = new Complex(
      (Math.cos(1) * cosh(1)) / (0.5 * cosh(2 * 1) + 0.5 * Math.cos(2 * 1)),
      Math.sin(1) * sinh(1) / (0.5 * cosh(2 * 1) + 0.5 * Math.cos(2 * 1))
    );
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});