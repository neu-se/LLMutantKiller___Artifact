import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should handle atanh correctly for real numbers greater than 1', () => {
    const complex = new Complex(2, 0);
    const result = complex.atanh();
    expect(result.im).toBeCloseTo(0);
  });
});