import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should handle asec function correctly', () => {
    const complex = new Complex(0, 0);
    expect(complex.asec().toString()).toBe('0 Infinity');
  });
});