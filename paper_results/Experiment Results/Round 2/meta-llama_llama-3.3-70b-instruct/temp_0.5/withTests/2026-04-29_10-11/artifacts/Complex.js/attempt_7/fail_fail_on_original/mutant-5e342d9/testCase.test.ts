import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate the abs function for large numbers', () => {
    const complex = new Complex(3001, 3001);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(3001 * 3001 + 3001 * 3001));
  });
});