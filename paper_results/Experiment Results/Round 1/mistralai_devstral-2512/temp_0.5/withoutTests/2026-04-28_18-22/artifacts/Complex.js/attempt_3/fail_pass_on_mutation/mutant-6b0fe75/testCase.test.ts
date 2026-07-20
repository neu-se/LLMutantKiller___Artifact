import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should correctly handle cosh calculation when Math.cosh exists", () => {
    // Store original Math.cosh
    const originalCosh = Math.cosh;
    try {
      // Ensure Math.cosh exists (simulating browser environment)
      Math.cosh = Math.cosh || function(x) { return (Math.exp(x) + Math.exp(-x)) * 0.5; };

      // Test with a value where the fallback implementation is needed
      const c = new Complex(0.1, 0);
      const result = c.cosh();

      // The original code should use the fallback when Math.cosh exists
      // The mutated code would use undefined due to the && operator
      expect(result.re).toBeCloseTo(1.0050041680558035);
      expect(result.im).toBeCloseTo(0);
    } finally {
      // Restore original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});