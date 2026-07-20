const Complex = require('./complex.js');

describe('Complex', () => {
  it('should calculate hypot correctly for a = 3 and b = 4', () => {
    const complex = new Complex(3, 4);
    const result = complex.abs();
    expect(result).toBeCloseTo(5);
  });

  it('should calculate hypot correctly for a = 0 and b = 4', () => {
    const complex = new Complex(0, 4);
    const result = complex.abs();
    expect(result).toBeCloseTo(4);
  });

  it('should calculate hypot correctly for a = 3 and b = 0', () => {
    const complex = new Complex(3, 0);
    const result = complex.abs();
    expect(result).toBeCloseTo(3);
  });

  it('should calculate hypot correctly for a = 0 and b = 0', () => {
    const complex = new Complex(0, 0);
    const result = complex.abs();
    expect(result).toBeCloseTo(0);
  });
});