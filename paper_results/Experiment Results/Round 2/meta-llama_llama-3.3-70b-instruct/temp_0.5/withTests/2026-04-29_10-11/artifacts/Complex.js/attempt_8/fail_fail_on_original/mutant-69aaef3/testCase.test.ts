const Complex = require('../../../../complex');

describe('Complex', () => {
  it('should calculate the hypot correctly', () => {
    const result = Complex.hypot(3, 4);
    expect(result).toBeCloseTo(5);
  });
});