import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should correctly calculate cosh when Math.cosh is available", () => {
    // Store original Math.cosh
    const originalCosh = Math.cosh;

    try {
      // Ensure Math.cosh exists and returns a different value
      Math.cosh = function(x) { return x * 2; };

      const c = new Complex(1, 0);
      const result = c.cosh();

      // Original (||) will use the fallback implementation
      // Mutated (&&) will use Math.cosh (returning 2)
      expect(result.re).toBeCloseTo(1.5430806348152437);
      expect(result.im).toBeCloseTo(0);
    } finally {
      Math.cosh = originalCosh;
    }
  });
});