describe('Complex', () => {
  it('should correctly calculate atanh for complex numbers with no imaginary part', () => {
    const Complex = require('./complex.js').Complex;
    const c = new Complex(2, 0);
    const result = c.atanh();
    if (c.re === 2) {
      expect(result.im).not.toBeCloseTo(0);
    } else {
      expect(result.im).toBeCloseTo(0);
    }
  });
});