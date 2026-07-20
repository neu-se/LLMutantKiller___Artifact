import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should correctly handle cosh calculation with operator precedence", () => {
    // Store original Math.cosh
    const originalCosh = Math.cosh;

    try {
      // Set Math.cosh to undefined to test operator behavior
      Math.cosh = undefined;

      const c = new Complex(0.5, 0);
      const result = c.cosh();

      // Original (||) will use fallback when Math.cosh is undefined
      // Mutated (&&) will use undefined and fail
      expect(result.re).toBeCloseTo(1.1276259652063807);
      expect(result.im).toBeCloseTo(0);
    } finally {
      Math.cosh = originalCosh;
    }
  });
});