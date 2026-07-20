import { Complex } from '../../complex';

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 1);
    const originalResult = complex.csc();
    const result = new Complex(
      Math.sin(1) * Math.cosh(1) / (0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1)),
      -Math.cos(1) * Math.sinh(1) / (0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1))
    );
    expect(originalResult.re).toBeCloseTo(result.re, 10);
    expect(originalResult.im).toBeCloseTo(result.im, 10);
  });
});