import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should use fallback cosh implementation when Math.cosh is available", () => {
    // Ensure Math.cosh exists but we want to test the fallback
    const originalCosh = Math.cosh;
    let fallbackUsed = false;

    // Replace Math.cosh with a version that tracks if it's called
    Math.cosh = (x) => {
      fallbackUsed = true;
      return originalCosh(x);
    };

    try {
      const c = new Complex(0.5, 0);
      const result = c.cosh();

      // Original code uses fallback (||) so Math.cosh should be called
      // Mutated code uses && so Math.cosh wouldn't be called (fallbackUsed stays false)
      expect(fallbackUsed).toBe(true);
      expect(result.re).toBeCloseTo(1.1276259652063807);
      expect(result.im).toBeCloseTo(0);
    } finally {
      Math.cosh = originalCosh;
    }
  });
});