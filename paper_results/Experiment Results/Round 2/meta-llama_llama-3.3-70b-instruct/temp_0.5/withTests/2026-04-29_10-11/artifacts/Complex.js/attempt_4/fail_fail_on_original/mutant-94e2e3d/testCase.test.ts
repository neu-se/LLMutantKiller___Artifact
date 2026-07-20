import { Complex } from './complex';

describe('Complex.js', () => {
  it('should handle pow with zero base and exponent correctly', () => {
    const z = new Complex(0, 0);
    const result = z.pow(1, 0);
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});