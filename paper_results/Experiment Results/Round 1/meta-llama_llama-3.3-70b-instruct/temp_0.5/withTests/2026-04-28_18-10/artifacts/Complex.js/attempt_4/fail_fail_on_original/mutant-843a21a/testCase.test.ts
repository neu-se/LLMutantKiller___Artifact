import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return a finite result when asech is called with a non-zero real part', () => {
    // Arrange
    const complex = new Complex(0.5, 0);

    // Act
    const result = complex.asech();

    // Assert
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});