import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate the complex exponent correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.exp();
    if (complex.im !== 0) {
      expect(result.re).toBeCloseTo(Math.cos(complex.im), 10);
      expect(result.im).toBeCloseTo(Math.sin(complex.im), 10);
    } else {
      expect(result.re).toBeCloseTo(Math.exp(complex.re), 10);
      expect(result.im).toBeCloseTo(0, 10);
    }
  });
});