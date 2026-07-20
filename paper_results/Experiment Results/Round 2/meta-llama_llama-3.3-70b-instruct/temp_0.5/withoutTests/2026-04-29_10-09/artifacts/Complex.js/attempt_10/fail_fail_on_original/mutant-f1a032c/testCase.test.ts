describe('Complex', () => {
  it('should floor the imaginary part correctly', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(3.14159, 2.71828);
    const floored = complex.floor(2);
    expect(floored.im).toEqual(Math.floor(2.71828 * 100) / 100);
  });
});