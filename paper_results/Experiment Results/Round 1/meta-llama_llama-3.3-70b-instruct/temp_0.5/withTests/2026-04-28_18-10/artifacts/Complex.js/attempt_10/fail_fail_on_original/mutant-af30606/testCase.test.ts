describe('Complex', () => {
  it('should return the correct result for the sech function', () => {
    const complex = new (require('./complex.js').Complex)(1, 1);
    const result = complex.sech();
    expect(result.im).toBeCloseTo(-2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2) + Math.cosh(2)), 1e-10);
  });
});