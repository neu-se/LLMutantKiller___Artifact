import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should handle undefined input correctly', () => {
    const complex = new Complex();
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
  });
});