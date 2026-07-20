import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('3+4i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(4);

    // Test with a string containing a space character
    const complexWithSpace = new Complex('3+ 4i');
    expect(complexWithSpace.re).toBe(3);
    expect(complexWithSpace.im).toBe(4);
  });
});