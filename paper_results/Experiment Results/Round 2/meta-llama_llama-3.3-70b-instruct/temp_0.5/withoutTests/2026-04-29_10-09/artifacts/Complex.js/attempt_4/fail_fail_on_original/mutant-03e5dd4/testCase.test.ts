import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complex = new Complex('3+4i');
    expect(complex.re).toBe(3);
    expect(complex.im).toBe(4);

    // Test with a string containing a tab character
    const complexWithTab = new Complex('3+\t4i');
    expect(complexWithTab.re).toBe(0);
    expect(complexWithTab.im).toBe(0);
  });
});