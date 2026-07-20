import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should handle acsc correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(complex.acsc().re).not.toBe(complex.acsc().im);
  });
});