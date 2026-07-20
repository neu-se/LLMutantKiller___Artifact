describe('Complex', () => {
  it('should correctly calculate the complex asech for a non-zero value', () => {
    const Complex = require('./complex.js').Complex;
    const c = new Complex(0.5, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});