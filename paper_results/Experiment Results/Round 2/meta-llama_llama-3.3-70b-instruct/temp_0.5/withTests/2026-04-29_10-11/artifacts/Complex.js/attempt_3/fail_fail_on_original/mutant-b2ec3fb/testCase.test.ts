import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly floor the real part of a complex number', () => {
    const complex = new Complex(10.5, 20.7);
    const floored = complex.floor(0);
    expect(floored.re).toBe(10);
    expect(floored.im).toBe(20);
  });
});