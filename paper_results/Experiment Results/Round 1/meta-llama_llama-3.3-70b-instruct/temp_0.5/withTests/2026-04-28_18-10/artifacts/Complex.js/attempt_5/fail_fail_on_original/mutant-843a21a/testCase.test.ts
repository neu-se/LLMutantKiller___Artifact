import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return a finite result when asech is called with a non-zero real part', () => {
    // Arrange
    const complex = new Complex(0.5, 0);

    // Act
    const result = complex.asech();

    // Assert
    expect(result.re).not.toBe(0);
    expect(result.im).toBeCloseTo(0);
  });
});