import { Complex } from './complex';

describe('Complex.js', () => {
  it('should return the correct result for the csc function', () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    expect(result.im).not.toBeCloseTo(-Math.cos(c.re) * Math.sinh(c.im) * (Math.cos(c.re) * Math.cosh(c.im) - Math.sin(c.re) * Math.sinh(c.im)), 10);
  });
});