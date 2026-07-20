import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should correctly handle the acsc function', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
    const complex2 = new Complex(0, 1);
    const result2 = complex2.acsc();
    expect(result2.re).not.toBeCloseTo(0, 10);
  });
});