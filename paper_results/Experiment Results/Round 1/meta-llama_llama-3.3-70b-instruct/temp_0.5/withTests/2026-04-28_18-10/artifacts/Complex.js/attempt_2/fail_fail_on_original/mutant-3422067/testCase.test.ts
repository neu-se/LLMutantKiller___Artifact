import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const result = new Complex(a, b).abs();
    expect(result).toBeCloseTo(4242.64, 2);
  });
});