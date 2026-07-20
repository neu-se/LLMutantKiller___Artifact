import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should use fallback when Math.cosh is falsy", () => {
    // Store original Math.cosh
    const originalCosh = Math.cosh;

    try {
      // Set Math.cosh to null to test operator behavior
      Math.cosh = null;

      const c = new Complex(0.5, 0);
      const result = c.cosh();

      // Original (||) will use fallback when Math.cosh is null
      // Mutated (&&) will use null and fail
      expect(result.re).toBeCloseTo(1.1276259652063807);
      expect(result.im).toBeCloseTo(0);
    } finally {
      Math.cosh = originalCosh;
    }
  });
});