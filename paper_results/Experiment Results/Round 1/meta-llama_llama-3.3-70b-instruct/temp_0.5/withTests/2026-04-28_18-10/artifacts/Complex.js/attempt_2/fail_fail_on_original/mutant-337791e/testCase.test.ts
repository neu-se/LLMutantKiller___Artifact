import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the complex exponent correctly', () => {
    const complex = new Complex(0, 1);
    const result = complex.exp();
    expect(result.re).toBeCloseTo(Math.cos(1), 10);
    expect(result.im).toBeCloseTo(Math.sin(1), 10);
  });
});