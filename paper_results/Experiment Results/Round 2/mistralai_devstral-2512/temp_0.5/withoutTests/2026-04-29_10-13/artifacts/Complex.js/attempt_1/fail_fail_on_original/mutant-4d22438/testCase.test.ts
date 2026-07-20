// Test case to detect the mutation in the hypot function
import { Complex } from "./complex.js";

describe('Complex hypot function mutation', () => {
  it('should correctly calculate the magnitude of a complex number with large values', () => {
    // Create a complex number with large real and imaginary parts
    const c = new Complex(10000, 20000);
    // The correct magnitude should be sqrt(10000^2 + 20000^2) = sqrt(100000000 + 400000000) = sqrt(500000000) ≈ 22360.679775
    const magnitude = c.abs();
    // With the mutation (b = y * x instead of b = y / x), the calculation would be wrong
    // This test will fail if the mutation is present because the magnitude will be incorrect
    expect(magnitude).toBeCloseTo(22360.679775, 5);
  });
});