import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the cosecans correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    expect(complex.im).toBe(1);
  });
});