import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly handle atanh calculation for zero imaginary part', () => {
    const complex = new Complex(1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});