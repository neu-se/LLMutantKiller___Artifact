import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should handle the cosh function correctly', () => {
    // Arrange
    const complexNumber = new Complex(2, 0);

    // Act
    const result = complexNumber.cosh();

    // Assert
    expect(result.re).toBeCloseTo(3.7621956910836314);
    expect(result.im).toBeCloseTo(0);
  });
});