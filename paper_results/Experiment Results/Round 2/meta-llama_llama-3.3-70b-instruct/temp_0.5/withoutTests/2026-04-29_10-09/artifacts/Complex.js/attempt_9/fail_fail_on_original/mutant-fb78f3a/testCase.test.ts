describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a = 0 and b = 0 in the original code, but fail in the mutated code', () => {
    const Complex = require('../complex.js').Complex;
    const complex = new Complex(0, 0);
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Infinity, 10);
    const complex2 = new Complex(1, 0);
    const result2 = complex2.asec();
    expect(result2.re).not.toBeCloseTo(0, 10);
    expect(result2.im).not.toBeCloseTo(Infinity, 10);
  });
});