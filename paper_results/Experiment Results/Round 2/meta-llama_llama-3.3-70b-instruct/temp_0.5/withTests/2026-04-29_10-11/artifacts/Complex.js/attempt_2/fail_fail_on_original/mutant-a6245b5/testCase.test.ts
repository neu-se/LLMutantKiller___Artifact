import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly handle atanh calculation for non-zero imaginary part', () => {
    const complex = new Complex(0, 1);
    const result = complex.atanh();
    const expected = new Complex(0, -Math.PI / 4);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});