// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly handle cosh when Math.cosh is not a function", () => {
    // Save the original Math.cosh if it exists
    const originalCosh = Math.cosh;
    // Set Math.cosh to a non-function value to test the fallback
    (Math as any).cosh = 0;

    try {
      // Create a complex number and call cosh
      const c = new Complex(1, 0);
      const result = c.cosh();

      // With original code (||), fallback is used and returns correct value
      // With mutated code (&&), cosh becomes 0 and calling it throws TypeError
      expect(result.re).toBeCloseTo(1.5430806348152437, 10);
      expect(result.im).toBe(0);
    } finally {
      // Restore the original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});