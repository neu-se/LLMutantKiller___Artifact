import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const result1 = Math.hypot(3000, 3000);
    const result2 = Math.hypot(3000, 3001);
    const complex1 = new Complex(3000, 3000);
    const complex2 = new Complex(3000, 3001);
    expect(complex1.abs()).toBeCloseTo(result1, 1e-15);
    expect(complex2.abs()).toBeCloseTo(result2, 1e-15);
  });
});