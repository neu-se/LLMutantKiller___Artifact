// Make sure complex.js is in the same directory as this file
import { Complex } from './complex.js';

describe('Complex', () => {
  it('should calculate atanh correctly', () => {
    const complex = new Complex(1.5, 0);
    expect(complex.atanh().im).toBeCloseTo(0);
  });
});