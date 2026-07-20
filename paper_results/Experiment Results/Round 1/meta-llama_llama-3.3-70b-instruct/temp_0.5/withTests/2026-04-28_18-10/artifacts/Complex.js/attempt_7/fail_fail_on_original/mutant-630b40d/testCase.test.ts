import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3, 4);
    const result = complex.abs();
    expect(result).toBeCloseTo(5, 10);
    const manualResult = 3 * Math.sqrt(1 + (4/3) * (4/3));
    expect(result).toBeCloseTo(manualResult, 10);
  });
});