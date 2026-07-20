import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly for values near 3000', () => {
    const a = 3000;
    const b = 2999;
    const result = new Complex(a, b).abs();
    const expected = Math.sqrt(a * a + b * b);
    expect(result).toBeCloseTo(expected, 10);
  });
});