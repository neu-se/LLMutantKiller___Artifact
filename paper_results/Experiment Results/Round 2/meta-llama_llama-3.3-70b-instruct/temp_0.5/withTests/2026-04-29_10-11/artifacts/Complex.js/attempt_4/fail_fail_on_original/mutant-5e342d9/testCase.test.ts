import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate the abs function', () => {
    const complex = new Complex(3, 4);
    const result = complex.abs();
    expect(result).toBeCloseTo(5);
  });
});