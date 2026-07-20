import { Complex } from './complex.js';

describe('Complex', () => {
  it('should create a complex number with zero imaginary part when no arguments are provided', () => {
    const complex = new Complex();
    expect(complex.re).toBe(0);
    expect(complex.im).toBe(0);
  });
});