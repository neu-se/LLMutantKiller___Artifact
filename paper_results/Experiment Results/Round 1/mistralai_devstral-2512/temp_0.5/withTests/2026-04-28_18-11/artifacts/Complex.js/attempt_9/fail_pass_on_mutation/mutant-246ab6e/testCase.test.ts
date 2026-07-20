// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for negative values where mutation causes incorrect results", () => {
    // The mutation changes Math.exp(-x) to Math.exp(+x)
    // For negative x, this would incorrectly compute cosh
    // We need to test a value that will use the fallback implementation

    // First, save the original Math.cosh and make it undefined to force fallback
    const originalCosh = Math.cosh;
    Math.cosh = undefined;

    try {
      const z = new Complex(-0.5, 0);
      const result = z.cosh();

      // Original calculation: (Math.exp(-0.5) + Math.exp(0.5)) * 0.5
      const originalExpected = (Math.exp(-0.5) + Math.exp(0.5)) * 0.5;
      // Mutated calculation: (Math.exp(-0.5) + Math.exp(-0.5)) * 0.5 = Math.exp(-0.5)
      const mutatedExpected = Math.exp(-0.5);

      // The test should pass on original (matching originalExpected)
      // and fail on mutated (matching mutatedExpected instead)
      expect(result.re).toBeCloseTo(originalExpected, 10);
      expect(result.im).toBeCloseTo(0, 10);
    } finally {
      Math.cosh = originalCosh;
    }
  });
});