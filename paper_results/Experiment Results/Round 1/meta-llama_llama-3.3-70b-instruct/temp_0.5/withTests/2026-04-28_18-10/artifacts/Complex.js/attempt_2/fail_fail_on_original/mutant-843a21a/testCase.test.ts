import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result when asech is called with a non-zero real part', () => {
    // Arrange
    const complex = new Complex(0.5, 0);

    // Act
    const result = complex.asech();

    // Assert
    expect(result.re).toBeCloseTo(Math.log((1 + Math.sqrt(1 - 0.5 * 0.5)) / 0.5));
    expect(result.im).toBeCloseTo(0);
  });
});