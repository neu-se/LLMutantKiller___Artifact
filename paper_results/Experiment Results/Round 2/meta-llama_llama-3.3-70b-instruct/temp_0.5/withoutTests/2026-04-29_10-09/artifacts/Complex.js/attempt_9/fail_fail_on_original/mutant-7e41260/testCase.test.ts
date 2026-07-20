describe('Complex', () => {
  it('should correctly calculate division', () => {
    const Complex = require('./complex.js').Complex;
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo(0.44, 2);
    expect(result.im).toBeCloseTo(0.08, 2);
  });
});