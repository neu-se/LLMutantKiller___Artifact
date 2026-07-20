import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return a non-Infinity result for acsch when the real part is not zero', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).not.toBe(Infinity);
    expect(result.im).not.toBe(Infinity);
  });
});