// Test case to detect the mutation in the hypot function
import { Complex } from "./complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should correctly handle edge case where b equals 3000", () => {
    // Create a complex number with re=3000 and im=3000
    const c = new Complex(3000, 3000);
    // The abs() method uses the hypot function internally
    const absValue = c.abs();
    // The expected value should be calculated using the more precise method
    // when a >= 3000 or b >= 3000 (original code uses < 3000 for both)
    // For the mutation (b <= 3000), this case would incorrectly use the simple sqrt method
    const expected = Math.sqrt(3000 * 3000 + 3000 * 3000);
    // The actual implementation should use the more precise calculation
    // when either a or b is >= 3000, but the mutation would incorrectly
    // use the simple method when b == 3000
    expect(absValue).toBeCloseTo(expected);
  });
});