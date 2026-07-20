import { Complex } from './complex.js';

describe('Complex', () => {
  it('should create a complex number with real and imaginary parts when two arguments are provided', () => {
    const complex = new Complex(1, 2);
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });
});