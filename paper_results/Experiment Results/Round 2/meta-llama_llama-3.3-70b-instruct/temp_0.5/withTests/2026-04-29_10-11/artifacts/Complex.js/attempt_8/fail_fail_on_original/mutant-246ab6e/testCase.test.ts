import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should handle the cosh function correctly', () => {
    // Arrange
    const c = new Complex(-1, 0);

    // Act
    const result = c.cosh();

    // Assert
    expect(result.re).toBeCloseTo(Math.cosh(-1));
    expect(result.im).toBeCloseTo(0);
    expect(result.re).not.toBeCloseTo(Math.exp(-1));
  });
});