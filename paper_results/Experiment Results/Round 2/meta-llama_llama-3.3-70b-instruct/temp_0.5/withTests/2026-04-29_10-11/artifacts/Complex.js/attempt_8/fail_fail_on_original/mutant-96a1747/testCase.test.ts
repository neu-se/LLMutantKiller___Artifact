describe('Complex', () => {
  it('should correctly calculate the complex atanh', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(1.1, 0);
    const atanh = complex.atanh();
    expect(atanh.re).toBeCloseTo(0.9501821192326173, 5);
    expect(atanh.im).toBeCloseTo(0, 5);
    expect(atanh.toString()).not.toContain('NaN');
  });
});