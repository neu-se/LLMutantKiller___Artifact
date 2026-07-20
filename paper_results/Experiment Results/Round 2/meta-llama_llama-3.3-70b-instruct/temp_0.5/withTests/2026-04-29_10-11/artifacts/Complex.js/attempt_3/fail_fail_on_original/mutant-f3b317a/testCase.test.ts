import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return a complex number with a real part of 0 and an imaginary part of Infinity when a and b are 0 in asec', () => {
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});