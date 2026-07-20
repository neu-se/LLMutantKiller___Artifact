import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const result1 = Complex.hypot(3000, 3000);
    const result2 = Complex.hypot(3000, 3001);
    expect(result1).not.toBeCloseTo(result2, 10);
  });
});