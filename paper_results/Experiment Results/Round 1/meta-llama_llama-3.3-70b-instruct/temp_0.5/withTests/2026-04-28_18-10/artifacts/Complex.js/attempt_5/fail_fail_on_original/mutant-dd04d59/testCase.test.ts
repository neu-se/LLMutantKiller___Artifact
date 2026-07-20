import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should handle asinh correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.asinh();
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
    expect(result.re).not.toEqual(result.im);
  });
});