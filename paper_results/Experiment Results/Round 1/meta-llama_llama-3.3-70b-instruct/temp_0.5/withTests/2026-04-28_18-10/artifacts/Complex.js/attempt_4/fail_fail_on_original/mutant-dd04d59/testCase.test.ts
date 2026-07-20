import { Complex } from './complex';

describe('Complex.js', () => {
  it('should handle asinh correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.asinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(result.im);
  });
});