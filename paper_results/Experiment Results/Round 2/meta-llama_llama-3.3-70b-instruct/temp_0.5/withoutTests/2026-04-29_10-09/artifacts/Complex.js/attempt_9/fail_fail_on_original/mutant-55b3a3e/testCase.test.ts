describe('Complex', () => {
  it('should calculate acsc correctly and fail for mutated code', () => {
    const Complex = require('../complex').Complex;
    const complex = new Complex(1, 0);
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(-Math.PI / 2);
  });
});