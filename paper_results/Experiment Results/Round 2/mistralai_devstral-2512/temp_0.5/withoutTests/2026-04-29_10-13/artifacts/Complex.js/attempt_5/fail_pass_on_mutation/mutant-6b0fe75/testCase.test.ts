import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should use fallback cosh implementation when Math.cosh is available but returns incorrect value", () => {
    // Store original implementation
    const originalCosh = Math.cosh;

    // Override with incorrect implementation
    Math.cosh = (x) => 0;

    try {
      const c = new Complex(0.5, 0);
      const result = c.cosh();

      // Original code uses fallback when Math.cosh returns incorrect value
      // Mutated code would use Math.cosh (due to && instead of ||) and return 0
      expect(result.re).not.toBe(0);
      expect(result.re).toBeCloseTo(1.1276259652063807);
      expect(result.im).toBeCloseTo(0);
    } finally {
      // Restore original implementation
      Math.cosh = originalCosh;
    }
  });
});