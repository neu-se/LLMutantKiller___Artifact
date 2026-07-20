import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    expect(complex.acsc().re).not.toBe(complex.acsc().im);
  });
});