import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3, 4);
    expect(complex.abs()).toBeCloseTo(5);
  });
});