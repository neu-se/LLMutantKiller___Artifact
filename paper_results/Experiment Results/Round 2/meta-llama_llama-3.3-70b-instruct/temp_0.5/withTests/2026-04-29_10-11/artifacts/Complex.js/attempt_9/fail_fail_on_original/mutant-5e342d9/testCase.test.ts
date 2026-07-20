import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should correctly calculate the abs function for large numbers', () => {
    const complex = new Complex(3000, 3000);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(3000 * 3000 + 3000 * 3000));
  });
});