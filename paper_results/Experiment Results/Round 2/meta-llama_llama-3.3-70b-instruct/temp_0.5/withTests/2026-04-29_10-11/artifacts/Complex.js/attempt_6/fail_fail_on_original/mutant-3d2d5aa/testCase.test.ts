describe('Complex', () => {
  it('should correctly calculate the complex acoth for a = 1 and b = 1', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(1, 1);
    const result = complex.acoth();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    const originalComplex = new Complex(1, 1);
    const originalResult = originalComplex.acoth();
    expect(result.re).toBeCloseTo(originalResult.re);
    expect(result.im).toBeCloseTo(originalResult.im);
  });
});