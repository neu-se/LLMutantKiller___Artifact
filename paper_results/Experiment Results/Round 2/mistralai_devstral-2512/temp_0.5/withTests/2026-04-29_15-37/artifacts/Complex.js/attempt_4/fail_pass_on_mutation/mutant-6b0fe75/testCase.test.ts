// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use fallback cosh implementation when Math.cosh is not available", () => {
    // Save the original Math.cosh if it exists
    const originalCosh = Math.cosh;
    // Delete Math.cosh to force fallback implementation
    delete (Math as any).cosh;

    try {
      // Test with a value that would trigger the fallback implementation
      const x = 0.0001; // Small value that should use the 1 - x approximation
      const result = new Complex(x, 0).cosh();

      // With the original code (using ||), the fallback should be used
      // The correct result should be approximately 1 - x = 0.9999
      // With the mutated code (using &&), Math.cosh would be undefined and the fallback wouldn't execute
      // In that case, cosh would be undefined and calling it would throw an error
      expect(result.re).toBeCloseTo(0.9999, 3);
      expect(result.im).toBe(0);
    } finally {
      // Restore the original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});