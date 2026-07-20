import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsch();
    if (complex.re === 1 && complex.im === 0) {
      expect(result.re).toBeCloseTo(0, 10);
      expect(result.im).toBeCloseTo(0, 10);
    } else {
      expect(result.re).not.toBeCloseTo(0, 10);
    }
  });
});