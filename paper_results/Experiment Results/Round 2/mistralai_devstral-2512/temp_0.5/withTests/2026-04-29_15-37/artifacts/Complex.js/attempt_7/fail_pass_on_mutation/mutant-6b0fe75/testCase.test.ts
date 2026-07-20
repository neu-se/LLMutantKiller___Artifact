// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use fallback cosh implementation when Math.cosh is not available", () => {
    // Save the original Math.cosh if it exists
    const originalCosh = Math.cosh;
    // Override Math.cosh with a non-function value to force fallback
    (Math as any).cosh = false;

    try {
      // Test with a value that would trigger the fallback implementation
      const result = new Complex(1, 0).cosh();

      // With the original code (using ||), the fallback should be used
      // The correct result should be cosh(1) ≈ 1.5430806348152437
      expect(result.re).toBeCloseTo(1.5430806348152437, 10);
      expect(result.im).toBe(0);
    } finally {
      // Restore the original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});