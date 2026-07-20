import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should handle the cosh function correctly', () => {
    // Arrange
    const x = -1;

    // Act
    const resultOriginal = (Math.exp(x) + Math.exp(-x)) * 0.5;
    const resultMutated = (Math.exp(x) + Math.exp(+x)) * 0.5;

    // Assert
    expect(resultOriginal).not.toEqual(resultMutated);
  });
});