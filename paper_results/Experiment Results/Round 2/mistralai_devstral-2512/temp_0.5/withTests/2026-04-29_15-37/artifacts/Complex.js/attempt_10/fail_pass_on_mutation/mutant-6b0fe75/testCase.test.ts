// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should use fallback implementation when Math.cosh is not available", () => {
    // Save the original Math.cosh if it exists
    const originalCosh = Math.cosh;
    // Set Math.cosh to undefined to force fallback
    (Math as any).cosh = undefined;

    try {
      // Test with a value that would trigger the fallback implementation
      const result = new Complex(0.5, 0).cosh();

      // With original code (||), fallback is used and returns correct value
      // With mutated code (&&), cosh becomes undefined and calling it throws
      expect(result.re).toBeCloseTo(1.1276259652063807, 10);
      expect(result.im).toBe(0);
    } catch (e) {
      // If we get here with original code, test fails
      throw new Error("Original code should not throw with fallback implementation");
    } finally {
      // Restore the original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});