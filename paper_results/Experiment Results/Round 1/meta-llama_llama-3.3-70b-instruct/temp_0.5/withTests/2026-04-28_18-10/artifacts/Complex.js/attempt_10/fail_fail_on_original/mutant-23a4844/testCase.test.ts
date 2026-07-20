import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should handle atanh correctly', () => {
    const complex = new Complex(-0.5, 0);
    const result = complex.atanh();
    expect(result.re).not.toBeNaN();
    expect(result.im).toBeCloseTo(0, 10);
    expect(result.re).not.toBe(0);
  });
});