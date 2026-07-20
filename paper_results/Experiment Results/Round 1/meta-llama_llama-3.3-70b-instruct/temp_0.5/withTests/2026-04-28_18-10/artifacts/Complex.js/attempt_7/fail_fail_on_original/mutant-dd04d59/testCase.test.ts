import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should handle asinh correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});