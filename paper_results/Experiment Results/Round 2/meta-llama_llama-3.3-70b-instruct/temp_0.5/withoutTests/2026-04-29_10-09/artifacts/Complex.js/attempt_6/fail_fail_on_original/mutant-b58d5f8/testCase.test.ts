import { Complex } from './complex.js';

describe('Complex', () => {
  it('should handle null input correctly', () => {
    const complex = new Complex(null);
    expect(complex.toString()).toBe('0 0i');
  });
});