import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly for a = 3000 and b = 3001', () => {
    const a = 3000;
    const b = 3001;
    const resultOriginal = Math.sqrt(a * a + b * b);
    const result = new Complex(a, b).abs();
    expect(result).toBeCloseTo(resultOriginal, 5);
  });
});