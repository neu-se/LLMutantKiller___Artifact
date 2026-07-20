import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly for a = 3 and b = 4', () => {
    const result = Math.hypot(3, 4);
    expect(result).toBeCloseTo(5);
  });
});