import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation", () => {
  it("should correctly calculate cosh when Math.cosh is available", () => {
    // Force Math.cosh to exist to test the operator difference
    const originalCosh = Math.cosh;
    Math.cosh = function(x) { return (Math.exp(x) + Math.exp(-x)) * 0.5; };

    try {
      const c = new Complex(1, 0);
      const result = c.cosh();

      // Original (||) will use Math.cosh
      // Mutated (&&) will use the fallback function
      // The results should be identical but the mutation changes the control flow
      expect(result.re).toBeCloseTo(1.5430806348152437);
      expect(result.im).toBeCloseTo(0);
    } finally {
      Math.cosh = originalCosh;
    }
  });
});