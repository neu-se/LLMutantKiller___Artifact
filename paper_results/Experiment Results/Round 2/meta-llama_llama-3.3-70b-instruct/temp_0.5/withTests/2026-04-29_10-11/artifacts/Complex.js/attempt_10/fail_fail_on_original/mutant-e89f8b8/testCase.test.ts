describe('Complex.js', () => {
  it('should return the correct result for the csc function', () => {
    const Complex = require('../../complex.js').Complex;
    const c = new Complex(1, 1);
    const result = c.csc();
    const d = Math.cos(c.re) * Math.cosh(c.im) - Math.sin(c.re) * Math.sinh(c.im);
    expect(d).not.toBe(0);
    expect(result.im).toBeCloseTo(-Math.cos(c.re) * Math.sinh(c.im) / d, 10);
  });
});