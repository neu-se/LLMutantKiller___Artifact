import { Complex } from './complex.js';

describe('Complex', () => {
  it('should correctly handle atanh calculation for non-zero imaginary part', () => {
    const complex = new Complex(0, 1);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 4, 10);
  });
});