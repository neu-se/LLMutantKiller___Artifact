describe('Complex', () => {
  it('should correctly calculate the complex sech', () => {
    const Complex = require('./complex').Complex;
    const z = new Complex(1, 1);
    const result = z.sech();
    expect(result.im).not.toBeCloseTo(-2 / Math.sinh(1) * Math.sin(1) / (Math.cos(2) + Math.cosh(2)), 10);
  });
});