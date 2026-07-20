import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate acsc correctly for non-zero imaginary part', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});