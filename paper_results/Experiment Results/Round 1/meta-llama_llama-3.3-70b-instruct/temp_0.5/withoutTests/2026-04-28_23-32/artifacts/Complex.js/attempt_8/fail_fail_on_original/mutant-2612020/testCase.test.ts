import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should have a real part equal to the real part of the input when parsing a string', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    const complex2 = new Complex('2+3i');
    expect(complex2.re).toBe(2);
  });
});