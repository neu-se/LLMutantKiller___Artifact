import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should use fallback cosh implementation when Math.cosh is not available", () => {
    // Temporarily remove Math.cosh to test fallback behavior
    const originalCosh = Math.cosh;
    delete Math.cosh;

    try {
      const c = new Complex(0.5, 0);
      const result = c.cosh();

      // The original code (||) should use the fallback
      // The mutated code (&&) would use undefined and fail
      expect(result.re).toBeCloseTo(1.1276259652063807);
      expect(result.im).toBeCloseTo(0);
    } finally {
      // Restore Math.cosh
      Math.cosh = originalCosh;
    }
  });
});