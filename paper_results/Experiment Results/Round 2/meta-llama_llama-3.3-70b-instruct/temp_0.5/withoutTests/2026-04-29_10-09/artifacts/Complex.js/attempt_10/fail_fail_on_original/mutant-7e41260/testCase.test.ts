describe('Complex', () => {
  it('should correctly calculate division', () => {
    const Complex = require('../complex').Complex;
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    const result = c1.div(c2);
    expect(result.re).toBeCloseTo(0.44, 2);
    expect(result.im).toBeCloseTo(0.08, 2);
    // Additional assertion to fail on mutated code
    expect(c1.div(c2).re).not.toBeCloseTo((1 * 3 + 2 * 4) * (3 + 4), 10);
  });
});