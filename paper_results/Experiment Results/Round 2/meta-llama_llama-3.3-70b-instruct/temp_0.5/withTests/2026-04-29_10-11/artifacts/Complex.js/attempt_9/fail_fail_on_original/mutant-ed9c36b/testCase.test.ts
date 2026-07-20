import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate sec correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.sec();
    expect(result.re).toBeCloseTo(Math.cos(1) * Math.cosh(2) / (0.5 * Math.cos(2 * 1) + 0.5 * Math.cosh(2 * 2)), 10);
    expect(result.im).toBeCloseTo(Math.sin(1) * Math.sinh(2) / (0.5 * Math.cos(2 * 1) + 0.5 * Math.cosh(2 * 2)), 10);
  });
});