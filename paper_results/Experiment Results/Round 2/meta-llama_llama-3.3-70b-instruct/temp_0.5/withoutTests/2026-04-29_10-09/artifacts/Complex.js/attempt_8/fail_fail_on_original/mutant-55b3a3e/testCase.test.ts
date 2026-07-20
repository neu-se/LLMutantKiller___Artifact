describe('Complex', () => {
  it('should calculate acsc correctly for a = 0 and b = 0', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(result.im).toBeCloseTo(Infinity);
  });
});