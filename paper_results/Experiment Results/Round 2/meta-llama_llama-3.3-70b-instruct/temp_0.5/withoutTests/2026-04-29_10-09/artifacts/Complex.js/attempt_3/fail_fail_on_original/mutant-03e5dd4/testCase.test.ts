import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('3+4i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(4);

    // Test with a string containing a newline character
    const complexWithNewline = new Complex('3+\n4i');
    expect(complexWithNewline.re).toBe(0);
    expect(complexWithNewline.im).toBe(0);
  });
});