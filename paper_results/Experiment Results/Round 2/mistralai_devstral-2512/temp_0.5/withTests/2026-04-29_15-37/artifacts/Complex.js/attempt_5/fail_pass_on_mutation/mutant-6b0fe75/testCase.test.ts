// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should throw when Math.cosh is not available and fallback is not used", () => {
    // Save the original Math.cosh if it exists
    const originalCosh = Math.cosh;
    // Delete Math.cosh to simulate an environment where it's not available
    delete (Math as any).cosh;

    try {
      // With the original code (using ||), the fallback should be used
      // With the mutated code (using &&), Math.cosh would be undefined and the fallback wouldn't execute
      // In that case, cosh would be undefined and calling it would throw an error
      expect(() => new Complex(1, 0).cosh()).not.toThrow();
    } finally {
      // Restore the original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});