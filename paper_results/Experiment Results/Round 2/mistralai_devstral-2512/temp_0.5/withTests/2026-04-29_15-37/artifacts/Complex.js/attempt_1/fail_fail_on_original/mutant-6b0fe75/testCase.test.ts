// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-6b0fe75/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh when Math.cosh is not available", () => {
    // Save the original Math.cosh if it exists
    const originalCosh = Math.cosh;
    // Delete Math.cosh to simulate an environment where it's not available
    delete (Math as any).cosh;

    try {
      // Test a value where the fallback implementation should be used
      const result = new Complex(1, 0).cosh();
      // The real part should be cosh(1) ≈ 1.5430806348152437
      expect(result.re).toBeCloseTo(1.5430806348152437, 10);
      // The imaginary part should be 0 since cosh of a real number is real
      expect(result.im).toBeCloseTo(0, 10);
    } finally {
      // Restore the original Math.cosh
      Math.cosh = originalCosh;
    }
  });
});