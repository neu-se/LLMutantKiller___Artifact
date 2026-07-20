import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should return the correct result for the csc function', () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    const expected = new Complex(
      Math.sin(c.re) * Math.cosh(c.im) / (Math.cos(c.re) * Math.cosh(c.im) - Math.sin(c.re) * Math.sinh(c.im)),
      Math.cos(c.re) * Math.sinh(c.im) / (Math.cos(c.re) * Math.cosh(c.im) - Math.sin(c.re) * Math.sinh(c.im))
    );
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});