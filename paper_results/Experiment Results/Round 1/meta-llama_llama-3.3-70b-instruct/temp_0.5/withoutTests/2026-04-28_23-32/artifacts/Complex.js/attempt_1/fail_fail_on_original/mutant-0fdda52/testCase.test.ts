import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should calculate the hypot correctly', () => {
    const complex = new Complex(3, 4);
    const result = complex.abs();
    expect(result).toBeCloseTo(5);
  });
});