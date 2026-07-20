import { Complex } from '../../complex';

describe('Complex', () => {
  it('should handle atanh correctly for real numbers greater than 1', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    if (complex.re === 2 && complex.im === 0) {
      expect(result.im).toBeCloseTo(0);
    } else {
      throw new Error('Invalid input');
    }
  });
});