describe('Complex.js', () => {
  it('should correctly handle the acsc function', () => {
    const Complex = require('../../../../complex.js').Complex;
    const complex = new Complex(0, 1);
    const result = complex.acsc();
    expect(result.re).not.toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});