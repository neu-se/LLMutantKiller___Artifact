describe('Complex', () => {
  it('should calculate the complex sinh correctly', () => {
    const Complex = require('../complex.js').Complex;
    const c = new Complex(0, 0);
    const result = c.sinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);
  });
});