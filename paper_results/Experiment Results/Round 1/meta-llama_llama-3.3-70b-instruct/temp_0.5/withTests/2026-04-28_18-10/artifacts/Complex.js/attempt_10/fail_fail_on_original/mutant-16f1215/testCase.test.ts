describe('Complex.js', () => {
  it('should handle acsc correctly', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});