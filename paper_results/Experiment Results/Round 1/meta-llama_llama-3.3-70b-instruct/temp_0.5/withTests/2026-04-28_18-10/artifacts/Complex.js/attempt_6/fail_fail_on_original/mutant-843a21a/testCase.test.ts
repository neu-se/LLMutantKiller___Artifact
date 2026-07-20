import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return a finite result when asech is called with a non-zero real part', () => {
    // Arrange
    const complex = new Complex(0.5, 0);

    // Act
    const result = complex.asech();

    // Assert
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
    expect(result.re).not.toBe(0);
  });
});