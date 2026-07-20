import { Complex } from './complex';

describe('Complex', () => {
  it('should handle asec function correctly', () => {
    const complex = new Complex(1, 0);
    expect(complex.asec().toString()).not.toBe('0 Infinity');
  });
});