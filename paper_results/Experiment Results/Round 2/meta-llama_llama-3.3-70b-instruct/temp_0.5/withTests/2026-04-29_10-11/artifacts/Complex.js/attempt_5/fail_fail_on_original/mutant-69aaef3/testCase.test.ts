const Complex = require('../complex');

describe('Complex', () => {
  it('should calculate the hypot correctly for non-overflowing values', () => {
    const c = new Complex(3, 4);
    const result = c.abs();
    expect(result).toBeCloseTo(5);
  });
});