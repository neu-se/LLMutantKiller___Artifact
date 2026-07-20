describe('Complex.js', () => {
  it('should handle acot correctly for a specific input', () => {
    const Complex = require('./complex').Complex;
    const complex = new Complex(0, 1);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.acot();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(0, 10);
    const complex3 = new Complex(0, 0);
    const result3 = complex3.acot();
    expect(result3.re).toBeCloseTo(0, 10);
    expect(result3.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});