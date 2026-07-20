import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should handle acot correctly for a specific input', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});