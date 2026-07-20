import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate the hypot function correctly', () => {
    const complex = new Complex(3001, 1);
    const result = complex.abs();
    expect(result).toBeCloseTo(3001);
  });
});