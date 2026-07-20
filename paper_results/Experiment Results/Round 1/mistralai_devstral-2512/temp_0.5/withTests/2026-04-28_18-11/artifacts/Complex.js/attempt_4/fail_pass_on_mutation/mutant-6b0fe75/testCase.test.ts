// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation test", () => {
  it("should expose the cosh mutation by testing direct cosh behavior", () => {
    // Store the original Math.cosh
    const originalCosh = Math.cosh;

    try {
      // Delete Math.cosh to force using the fallback implementation
      delete (Math as any).cosh;

      // Create a complex number that will directly test cosh behavior
      const c = new Complex(0.5, 0); // Real number

      // The cosh function is used in cosh method
      const result = c.cosh();

      // For x = 0.5, cosh(x) = (e^x + e^-x)/2 ≈ 1.1276259652
      // The mutation changes the fallback condition from || to &&
      // This should cause the function to return undefined in the mutant
      expect(result.re).toBeCloseTo(1.1276259652, 6);
      expect(result.im).toBeCloseTo(0, 6);
    } finally {
      // Restore the original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});