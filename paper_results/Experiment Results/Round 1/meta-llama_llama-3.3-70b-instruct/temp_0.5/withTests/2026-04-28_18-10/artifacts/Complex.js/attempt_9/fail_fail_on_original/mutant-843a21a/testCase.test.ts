import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a different result for asech when using original and mutated code', () => {
    // Arrange
    const complex = new Complex(0.5, 0);

    // Act
    const resultOriginal = complex.asech();

    // Assert
    const resultMutated = new Complex((0.5 * 0), 0).asech();
    expect(resultOriginal.re).not.toBe(resultMutated.re);
  });
});