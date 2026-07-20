import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3000, 3000);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(3000 * 3000 + 3000 * 3000), 1e-15);
  });
});