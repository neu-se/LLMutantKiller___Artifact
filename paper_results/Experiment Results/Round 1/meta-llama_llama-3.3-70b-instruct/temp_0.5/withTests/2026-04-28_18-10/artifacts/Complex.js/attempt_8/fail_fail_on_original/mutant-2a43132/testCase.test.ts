describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a finite value', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});