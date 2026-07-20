import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3000, 3000);
    const result = complex.abs();
    const expected = Math.sqrt(3000*3000 + 3000*3000);
    expect(result).toBeCloseTo(expected, 1e-15);
    const complex2 = new Complex(3000, 3001);
    const result2 = complex2.abs();
    const expected2 = Math.sqrt(3000*3000 + 3001*3001);
    expect(result2).toBeCloseTo(expected2, 1e-15);
  });
});