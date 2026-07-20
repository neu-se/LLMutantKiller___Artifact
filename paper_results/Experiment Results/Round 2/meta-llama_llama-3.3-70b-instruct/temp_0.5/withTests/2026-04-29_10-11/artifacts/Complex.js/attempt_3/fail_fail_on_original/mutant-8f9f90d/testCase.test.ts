import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for atanh', () => {
    const complex = new Complex(1, 2);
    const result = complex.atanh();
    expect(result).toBeInstanceOf(Complex);
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
  });
});