import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should not return Infinity when the real part is zero and the imaginary part is not zero for the acsch function', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
  });
});