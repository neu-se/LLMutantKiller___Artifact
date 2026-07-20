import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const resultOriginal = Math.hypot(a, b);
    const resultComplex = new Complex(a, b).abs();
    expect(resultOriginal).toBeCloseTo(resultComplex);
  });
});