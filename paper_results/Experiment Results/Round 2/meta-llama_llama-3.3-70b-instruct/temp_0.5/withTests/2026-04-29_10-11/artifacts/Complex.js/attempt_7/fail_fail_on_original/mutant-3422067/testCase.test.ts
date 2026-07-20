import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should return the correct result for hypot function when a is equal to b', () => {
    const a = 3000;
    const b = 3000;
    const resultOriginal = Math.sqrt(a * a + b * b);
    const result = new Complex(a, b).abs();
    expect(result).toBeCloseTo(resultOriginal);
  });
});