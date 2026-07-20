describe('Complex', () => {
  it('should calculate the hypot correctly', () => {
    const Complex = require('../../../../complex.js');
    const result1 = Complex.hypot(3, 4);
    const result2 = Complex.hypot(4, 3);
    expect(result1).not.toBeCloseTo(result2);
  });
});