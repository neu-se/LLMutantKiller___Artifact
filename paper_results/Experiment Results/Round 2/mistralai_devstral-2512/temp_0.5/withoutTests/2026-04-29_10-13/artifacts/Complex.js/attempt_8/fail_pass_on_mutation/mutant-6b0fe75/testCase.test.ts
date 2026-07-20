import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should correctly compute cosh when Math.cosh is undefined", () => {
    // Store original implementation
    const originalCosh = Math.cosh;
    // Remove Math.cosh to force fallback
    delete Math.cosh;

    try {
      const c = new Complex(0.5, 0);
      const result = c.cosh();

      // Original code uses fallback when Math.cosh is undefined (||)
      // Mutated code would not use fallback when Math.cosh is undefined (&&)
      expect(result.re).toBeCloseTo(1.1276259652063807);
      expect(result.im).toBeCloseTo(0);
    } finally {
      // Restore original implementation
      Math.cosh = originalCosh;
    }
  });
});