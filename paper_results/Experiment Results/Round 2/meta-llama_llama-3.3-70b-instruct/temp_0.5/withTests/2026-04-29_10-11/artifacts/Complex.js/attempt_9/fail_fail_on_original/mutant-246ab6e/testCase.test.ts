import { Complex } from './complex';

describe('Complex.js', () => {
  it('should handle the cosh function correctly', () => {
    // Arrange
    const c = new Complex(1, 0);

    // Act
    const result = c.cosh();

    // Assert
    expect(result.re).toBeCloseTo(1.5430806348152437);
    expect(result.im).toBeCloseTo(0);
    expect(Math.exp(1) + Math.exp(1)).not.toBeCloseTo(result.re * 2);
  });
});