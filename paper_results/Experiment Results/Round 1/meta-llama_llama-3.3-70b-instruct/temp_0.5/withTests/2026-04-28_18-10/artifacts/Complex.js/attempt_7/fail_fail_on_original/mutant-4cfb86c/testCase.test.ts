import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should handle acot correctly for a specific input', () => {
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    // Test case to check if the mutation causes a division by zero error
    const complex2 = new Complex(1, 0);
    const result2 = complex2.acot();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});