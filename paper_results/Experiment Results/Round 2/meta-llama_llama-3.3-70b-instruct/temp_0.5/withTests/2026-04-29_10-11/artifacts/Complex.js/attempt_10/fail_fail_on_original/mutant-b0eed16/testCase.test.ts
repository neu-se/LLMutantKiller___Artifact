import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the complex secant correctly', () => {
    const c = new Complex(1, 1);
    const result = c.sec();
    const expectedReal = (Math.cos(1) * cosh(1)) / (0.5 * cosh(2 * 1) + 0.5 * Math.cos(2 * 1));
    const expectedImaginary = Math.sin(1) * sinh(1) / (0.5 * cosh(2 * 1) + 0.5 * Math.cos(2 * 1));
    expect(result.re).toBeCloseTo(expectedReal, 10);
    expect(result.im).toBeCloseTo(expectedImaginary, 10);
  });
});