describe('Complex', () => {
  it('should calculate the complex sinh correctly', () => {
    const Complex = require('./complex.js').Complex;
    const c = new Complex(0, 0);
    const result = c.sinh();
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});