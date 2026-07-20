import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should correctly parse complex numbers from strings', () => {
    const complexNumber = new Complex('1+2i');
    expect(complexNumber.re).toBe(1);
    expect(complexNumber.im).toBe(2);
    const str = new Complex('1').toString();
    expect(str).not.toBe('NaN');
  });
});