// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation test", () => {
  it("should fail when cosh fallback is broken by mutation", () => {
    // Store the original Math.cosh
    const originalCosh = Math.cosh;

    try {
      // Force Math.cosh to be undefined to trigger the fallback
      (Math as any).cosh = undefined;

      // Create a complex number that will use cosh in its calculations
      const c = new Complex(0, 0.1);

      // The sinh function internally uses cosh
      // In the mutated version, when Math.cosh is undefined:
      // - Original: uses fallback (Math.cosh || function...)
      // - Mutant: returns undefined (Math.cosh && function...)
      const result = c.sinh();

      // This should work in original but fail in mutant
      expect(result.re).toBeCloseTo(0, 6);
      expect(result.im).toBeCloseTo(0.10016675, 6);
    } finally {
      // Restore the original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});