import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should use the correct cosh implementation based on operator precedence", () => {
    // Store original Math.cosh
    const originalCosh = Math.cosh;

    try {
      // Set Math.cosh to a function that returns a different value
      // to detect which implementation is being used
      Math.cosh = function(x) { return 999; };

      const c = new Complex(1, 0);
      const result = c.cosh();

      // Original code (||) will use the fallback when Math.cosh exists
      // Mutated code (&&) will use Math.cosh (returning 999)
      expect(result.re).not.toBe(999);
      expect(result.re).toBeCloseTo(1.5430806348152437);
    } finally {
      Math.cosh = originalCosh;
    }
  });
});