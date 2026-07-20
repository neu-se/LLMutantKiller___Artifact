import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the complex exponent correctly', () => {
    const complex = new Complex(0, 0);
    const result = complex.exp();
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(0, Math.PI / 2);
    const result2 = complex2.exp();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(1, 10);
  });
});