describe('Complex.js', () => {
  it('should correctly calculate acsch for a complex number', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result).toBeInstanceOf(Complex);
  });
});