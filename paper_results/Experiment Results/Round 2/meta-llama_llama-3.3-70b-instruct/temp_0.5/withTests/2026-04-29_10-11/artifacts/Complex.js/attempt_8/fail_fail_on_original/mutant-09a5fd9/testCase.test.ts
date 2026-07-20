describe('Complex', () => {
  it('should calculate the complex sech correctly', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(1, 0);
    const result = complex.sech();
    expect(result.re).toBeCloseTo(2 * Math.cosh(0) * Math.cos(0) / (Math.cos(0) + Math.cosh(0)), 10);
    expect(result.im).toBeCloseTo(-2 * Math.sinh(0) * Math.sin(0) / (Math.cos(0) + Math.cosh(0)), 10);
  });
});