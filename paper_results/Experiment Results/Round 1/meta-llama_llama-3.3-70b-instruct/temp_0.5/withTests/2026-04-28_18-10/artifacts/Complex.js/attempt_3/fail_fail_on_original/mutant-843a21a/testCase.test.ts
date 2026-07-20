import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a different result when asech is called with the original and mutated code', () => {
    // Arrange
    const complex = new Complex(0.5, 0);

    // Act
    const resultOriginal = complex.asech();

    // Assert
    expect(resultOriginal.re).not.toBeNaN();
    expect(resultOriginal.im).toBeCloseTo(0);
  });
});