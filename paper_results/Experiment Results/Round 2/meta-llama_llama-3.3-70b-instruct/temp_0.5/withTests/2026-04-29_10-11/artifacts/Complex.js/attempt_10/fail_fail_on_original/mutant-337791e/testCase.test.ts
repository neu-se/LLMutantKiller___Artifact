import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for exp when imaginary part is zero', () => {
    const complex = new Complex(1, 0);
    const result = complex.exp();
    if (complex.im === 0) {
      expect(result.re).toBeCloseTo(Math.E);
      expect(result.im).toBeCloseTo(0);
    } else {
      expect(result.re).toBeCloseTo(Math.cos(complex.im));
      expect(result.im).toBeCloseTo(Math.sin(complex.im));
    }
  });
});