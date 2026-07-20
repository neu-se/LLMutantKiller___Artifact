import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const complex = new Complex(1, 1);
    const resultOriginal = new Complex(2 * Math.cosh(1) * Math.cos(1), -2 * Math.sinh(1) * Math.sin(1));
    resultOriginal.re /= Math.cos(2 * 1) + Math.cosh(2 * 1);
    resultOriginal.im /= Math.cos(2 * 1) + Math.cosh(2 * 1);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(resultOriginal.re);
    expect(result.im).toBeCloseTo(resultOriginal.im);
  });
});