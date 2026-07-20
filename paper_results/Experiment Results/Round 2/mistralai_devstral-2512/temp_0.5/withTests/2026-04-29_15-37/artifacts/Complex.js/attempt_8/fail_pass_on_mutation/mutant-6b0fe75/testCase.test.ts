// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should throw when Math.cosh is falsy and mutation uses && operator", () => {
    // Save the original Math.cosh if it exists
    const originalCosh = Math.cosh;
    // Set Math.cosh to null to trigger the mutation difference
    (Math as any).cosh = null;

    try {
      // With original code (||), fallback is used
      // With mutated code (&&), cosh becomes null and calling it throws
      expect(() => new Complex(1, 0).cosh()).not.toThrow();
    } finally {
      // Restore the original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});