describe('Complex', () => {
  it('should calculate acsc correctly and fail for mutated code', () => {
    const Complex = require('./complex').Complex;
    const complex = new Complex(0, 0);
    const result = complex.acsc();
    expect(result.re).not.toBeCloseTo(Math.PI / 2);
  });
});