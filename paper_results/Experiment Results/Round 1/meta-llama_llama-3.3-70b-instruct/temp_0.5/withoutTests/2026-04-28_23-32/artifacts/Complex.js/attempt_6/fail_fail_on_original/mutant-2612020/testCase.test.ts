import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should have a real part equal to the real part of the input when parsing a string', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
  });
});