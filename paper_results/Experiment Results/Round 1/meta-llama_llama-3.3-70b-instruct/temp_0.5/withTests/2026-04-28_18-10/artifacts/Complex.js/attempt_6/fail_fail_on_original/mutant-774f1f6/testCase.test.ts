import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly parse a complex number', () => {
    const complex = new Complex(1, 2);
    expect(complex).toHaveProperty('re');
    expect(complex.re).toBe(1);
  });
});