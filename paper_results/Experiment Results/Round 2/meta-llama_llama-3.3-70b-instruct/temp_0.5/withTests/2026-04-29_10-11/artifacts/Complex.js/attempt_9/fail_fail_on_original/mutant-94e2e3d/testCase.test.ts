import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should handle pow with zero base and small positive exponent correctly', () => {
    const z = new Complex(0, 0);
    const result = z.pow(1e-10, 1);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});