import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should use fallback cosh implementation when Math.cosh is not a function", () => {
    // Store original implementation
    const originalCosh = Math.cosh;
    // Make Math.cosh non-function to test fallback behavior
    Math.cosh = 123 as any;

    try {
      const c = new Complex(0.5, 0);
      const result = c.cosh();

      // Original code uses fallback when Math.cosh is not a function (||)
      // Mutated code would try to use Math.cosh (&&) and fail
      expect(result.re).toBeCloseTo(1.1276259652063807);
      expect(result.im).toBeCloseTo(0);
    } finally {
      // Restore original implementation
      Math.cosh = originalCosh;
    }
  });
});