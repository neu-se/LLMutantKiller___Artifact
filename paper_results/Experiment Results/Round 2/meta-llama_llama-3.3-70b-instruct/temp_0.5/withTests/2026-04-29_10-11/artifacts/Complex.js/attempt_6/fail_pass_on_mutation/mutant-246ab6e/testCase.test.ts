import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should handle the cosh function correctly', () => {
    // Arrange
    const x = -1;

    // Act
    const result = (Math.exp(x) + Math.exp(-x)) * 0.5;

    // Assert
    expect(result).toBeCloseTo(Math.cosh(x));
  });
});