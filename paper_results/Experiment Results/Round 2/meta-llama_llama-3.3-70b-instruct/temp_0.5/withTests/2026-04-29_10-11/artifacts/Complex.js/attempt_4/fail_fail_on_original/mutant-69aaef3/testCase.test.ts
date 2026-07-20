const Complex = require('./complex.js');

describe('Complex', () => {
  it('should calculate the hypot correctly for non-overflowing values', () => {
    const a = 3;
    const b = 4;
    const result = Complex.hypot(a, b);
    expect(result).toBeCloseTo(5);
  });

  it('should calculate the hypot correctly for overflowing values', () => {
    const a = 3001;
    const b = 1;
    const result = Complex.hypot(a, b);
    expect(result).toBeCloseTo(Math.sqrt(a * a + b * b));
  });
});