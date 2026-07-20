import { Complex } from './complex';

describe('Complex', () => {
  it('should return the correct result for atan when the real part is 0 and the imaginary part is 1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    if (complex.re === 0 && complex.im === 1) {
      expect(result.im).toBeCloseTo(Infinity, 10);
    } else {
      expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    }
  });
});