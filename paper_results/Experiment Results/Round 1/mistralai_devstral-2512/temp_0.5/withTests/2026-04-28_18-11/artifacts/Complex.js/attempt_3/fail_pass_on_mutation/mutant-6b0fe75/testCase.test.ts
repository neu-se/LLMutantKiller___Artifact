// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh mutation test", () => {
  it("should correctly compute cosh when Math.cosh is not available", () => {
    // Store the original Math.cosh
    const originalCosh = Math.cosh;

    try {
      // Delete Math.cosh to force using the fallback implementation
      delete (Math as any).cosh;

      // Create a complex number that will use cosh in its calculations
      const c = new Complex(0, 0.0000001); // Very small imaginary part

      // The sinh function internally uses cosh, which will trigger our mutation
      const result = c.sinh();

      // For x = 0.0000001, cosh(x) ≈ 1 - x (from the fallback implementation)
      // sinh(x) = (e^x - e^-x)/2 ≈ x when x is small
      // So sinh(0.0000001i) should be approximately [0, 0.0000001]
      expect(result.re).toBeCloseTo(0, 10);
      expect(result.im).toBeCloseTo(0.0000001, 10);
    } finally {
      // Restore the original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});