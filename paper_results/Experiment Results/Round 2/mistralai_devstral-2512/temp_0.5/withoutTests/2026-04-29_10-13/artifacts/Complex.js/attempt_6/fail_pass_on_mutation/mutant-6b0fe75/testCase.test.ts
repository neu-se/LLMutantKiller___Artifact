import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should correctly handle cosh calculation when Math.cosh exists but is broken", () => {
    // Store original implementation
    const originalCosh = Math.cosh;

    // Override with broken implementation that throws
    Math.cosh = () => { throw new Error("Broken cosh"); };

    try {
      const c = new Complex(0.5, 0);
      const result = c.cosh();

      // Original code uses fallback when Math.cosh throws (due to ||)
      // Mutated code would try to use Math.cosh (due to &&) and throw
      expect(result.re).toBeCloseTo(1.1276259652063807);
      expect(result.im).toBeCloseTo(0);
    } finally {
      // Restore original implementation
      Math.cosh = originalCosh;
    }
  });
});