describe('Complex', () => {
  it('should correctly calculate the complex arcus secant for a finite value', () => {
    const Complex = require('../complex').Complex;
    const complex = new Complex(1, 1);
    const result = complex.asec();
    expect(result.re).not.toBe(0);
    expect(result.im).not.toBe(0);
  });
});