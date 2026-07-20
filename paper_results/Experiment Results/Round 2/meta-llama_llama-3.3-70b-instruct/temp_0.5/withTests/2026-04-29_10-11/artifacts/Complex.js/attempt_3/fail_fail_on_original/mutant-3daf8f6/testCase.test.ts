import { Complex } from './complex.js';

describe('Complex', () => {
  it('should handle hypot correctly', () => {
    const result1 = Math.hypot(3000, 3000);
    const result2 = Math.hypot(3000, 3000.000001);
    expect(result1).toBeCloseTo(result2, 10);
  });
});