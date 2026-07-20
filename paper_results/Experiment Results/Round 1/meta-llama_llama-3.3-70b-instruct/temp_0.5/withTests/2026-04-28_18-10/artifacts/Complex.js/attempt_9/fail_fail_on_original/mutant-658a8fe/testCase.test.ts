describe('Complex.js', () => {
  it('should return the correct result for the acsch function when d is not zero', () => {
    const Complex = require('../complex.js').Complex;
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const d = complex.re * complex.re + complex.im * complex.im;
    expect(d).toBeGreaterThan(0);
    expect(complex.acsch().re).not.toBe(complex.acsch().im);
  });
});