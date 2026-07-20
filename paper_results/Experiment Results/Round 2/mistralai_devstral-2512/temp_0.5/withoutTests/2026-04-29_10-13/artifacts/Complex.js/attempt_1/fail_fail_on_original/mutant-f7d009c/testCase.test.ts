// Test case to detect the mutation in the hypot function
import { Complex } from "./complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should correctly handle edge case where b equals 3000', () => {
    // Create a complex number where the imaginary part is exactly 3000
    const c = new Complex(0, 3000);
    // The abs() method uses hypot internally
    const absValue = c.abs();
    // The expected value is 3000
    expect(absValue).toBe(3000);
  });
});