import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.sech();
    const originalResult = new Complex(2 * Math.cosh(1) * Math.cos(1), -2 * Math.sinh(1) * Math.sin(1));
    originalResult.re /= Math.cos(2 * 1) + Math.cosh(2 * 1);
    originalResult.im /= Math.cos(2 * 1) + Math.cosh(2 * 1);
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});