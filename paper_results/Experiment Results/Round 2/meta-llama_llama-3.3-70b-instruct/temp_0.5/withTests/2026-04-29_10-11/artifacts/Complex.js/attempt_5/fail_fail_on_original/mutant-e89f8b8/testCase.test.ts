import { Complex } from '../../../complex.js';

describe('Complex.js', () => {
  it('should return the correct result for the csc function', () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    const d = Math.cos(c.re) * Math.cosh(c.im) - Math.sin(c.re) * Math.sinh(c.im);
    expect(d).not.toBe(0);
    expect(result.re).toBeCloseTo(-Math.sin(c.re) * Math.cosh(c.im) / d, 10);
    expect(result.im).toBeCloseTo(-Math.cos(c.re) * Math.sinh(c.im) / d, 10);
  });
});