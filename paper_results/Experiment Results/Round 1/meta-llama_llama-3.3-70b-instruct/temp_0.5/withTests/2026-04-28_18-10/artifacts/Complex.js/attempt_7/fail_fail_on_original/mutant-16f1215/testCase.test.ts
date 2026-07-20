import { Complex } from './complex';

describe('Complex.js', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(complex.acsc().re).not.toBe(complex.acsc().im);
  });
});