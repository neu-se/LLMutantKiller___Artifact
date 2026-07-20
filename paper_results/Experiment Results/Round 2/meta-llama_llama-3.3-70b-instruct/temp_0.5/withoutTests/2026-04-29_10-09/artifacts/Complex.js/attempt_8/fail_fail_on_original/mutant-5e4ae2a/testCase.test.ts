import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should handle atanh correctly for real numbers greater than 1', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    if (result.im !== 0) {
      throw new Error('Imaginary part is not zero');
    }
    expect(result.re).toBeCloseTo(0.5493061443340548);
  });
});