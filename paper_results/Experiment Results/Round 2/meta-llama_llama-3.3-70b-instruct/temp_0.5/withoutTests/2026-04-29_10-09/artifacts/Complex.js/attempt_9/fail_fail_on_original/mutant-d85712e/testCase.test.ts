import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should correctly parse a complex number from a string', () => {
    const complex = new Complex('1+2i');
    expect(complex.re).toBe(1);
    expect(complex.im).toBe(2);
  });

  it('should have a real part equal to the imaginary part when parsing a complex number with invalid imaginary part', () => {
    const complex = new Complex('1+Stryker was here!i');
    expect(complex.re).not.toBe(complex.im);
  });
});