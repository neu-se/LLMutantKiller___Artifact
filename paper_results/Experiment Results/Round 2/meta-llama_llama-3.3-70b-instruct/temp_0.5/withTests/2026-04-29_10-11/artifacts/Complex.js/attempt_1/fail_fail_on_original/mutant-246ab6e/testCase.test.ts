import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should handle the mutated cosh function correctly', () => {
    // Arrange
    const complexNumber = new Complex(1, 1);

    // Act
    const result = complexNumber.cosh();

    // Assert
    expect(result.re).not.toBeCloseTo(1.5430806348152437); // This is the result of the mutated cosh function
    expect(result.re).toBeCloseTo(1.5430806348152437, 10); // This is the result of the original cosh function
  });
});