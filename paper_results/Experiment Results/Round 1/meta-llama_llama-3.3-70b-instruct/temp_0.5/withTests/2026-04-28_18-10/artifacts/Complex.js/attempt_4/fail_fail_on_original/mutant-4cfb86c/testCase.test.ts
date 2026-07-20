import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should handle acot correctly for a specific input', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});