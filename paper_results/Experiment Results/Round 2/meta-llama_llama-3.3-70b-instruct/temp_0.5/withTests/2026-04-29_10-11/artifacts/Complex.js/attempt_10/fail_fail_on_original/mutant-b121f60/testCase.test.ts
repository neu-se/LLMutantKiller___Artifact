import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should parse complex numbers correctly', () => {
    const complexNumber = new Complex('1.23e+4');
    expect(complexNumber.re).toBe(12300);
    expect(complexNumber.im).toBe(0);
  });
});