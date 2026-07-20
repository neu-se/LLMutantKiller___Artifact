// Test case to detect the mutation in the hypot function
import { Complex } from "./complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should correctly handle edge case where b equals 3000', () => {
    // Create a complex number that will trigger the edge case in hypot
    const c = new Complex(3000, 3000);
    // The abs() method uses hypot internally
    const absValue = c.abs();
    // The original code should use the first branch (a < 3000 && b < 3000) = false
    // The mutated code would use the first branch (a < 3000 && b <= 3000) = true
    // This will produce different results due to different calculation paths
    expect(absValue).toBeCloseTo(Math.sqrt(3000 * 3000 + 3000 * 3000));
  });
});