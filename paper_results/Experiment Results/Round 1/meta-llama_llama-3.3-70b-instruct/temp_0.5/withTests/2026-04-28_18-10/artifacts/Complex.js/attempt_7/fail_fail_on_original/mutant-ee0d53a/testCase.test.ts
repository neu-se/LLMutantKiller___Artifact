describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const Complex = require('./complex.js').Complex;
    const complex = new Complex(3001, 3001);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(3001 * 3001 + 3001 * 3001));
    const complex2 = new Complex(3000, 3000);
    const result2 = complex2.abs();
    expect(result2).toBeCloseTo(Math.sqrt(3000 * 3000 + 3000 * 3000));
  });
});