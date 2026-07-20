// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation test", () => {
  it("should expose the cosh mutation by testing cosh with non-existent Math.cosh", () => {
    // Store the original Math.cosh
    const originalCosh = Math.cosh;

    try {
      // Delete Math.cosh to force using the fallback implementation
      delete (Math as any).cosh;

      // Create a complex number that will directly test cosh behavior
      const c = new Complex(0.5, 0);

      // The cosh function is used in cosh method
      // In the mutated version, when Math.cosh doesn't exist:
      // - Original: uses fallback (Math.cosh || function...)
      // - Mutant: returns undefined (Math.cosh && function...)
      const result = c.cosh();

      // This should work in original but fail in mutant
      // The mutant will return undefined for cosh, causing the result to be NaN
      expect(result.re).toBeCloseTo(1.1276259652, 6);
      expect(result.im).toBeCloseTo(0, 6);
      expect(result.isNaN()).toBe(false);
    } finally {
      // Restore the original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});