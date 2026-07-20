import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly for a = 3000 and b = 3000', () => {
    const a = 3000;
    const b = 3000;
    const result = new Complex(a, b).abs();
    expect(result).toBeCloseTo(Math.sqrt(a * a + b * b), 5);
  });
});