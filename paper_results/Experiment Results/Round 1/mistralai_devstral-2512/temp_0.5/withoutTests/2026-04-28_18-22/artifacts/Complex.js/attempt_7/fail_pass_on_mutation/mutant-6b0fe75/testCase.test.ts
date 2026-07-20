import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should use fallback implementation when Math.cosh exists", () => {
    // Store original Math.cosh
    const originalCosh = Math.cosh;

    try {
      // Set Math.cosh to a function that throws to verify fallback is used
      Math.cosh = function() { throw new Error("Should not be called"); };

      const c = new Complex(0.5, 0);
      const result = c.cosh();

      // Original (||) uses fallback, mutated (&&) would throw
      expect(result.re).toBeCloseTo(1.1276259652063807);
      expect(result.im).toBeCloseTo(0);
    } finally {
      Math.cosh = originalCosh;
    }
  });
});