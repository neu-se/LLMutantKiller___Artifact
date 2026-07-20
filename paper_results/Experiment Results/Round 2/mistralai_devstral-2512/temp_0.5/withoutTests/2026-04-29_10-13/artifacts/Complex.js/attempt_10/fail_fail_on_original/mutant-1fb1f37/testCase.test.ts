// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1fb1f37/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.cosh", () => {
  it("should use Taylor approximation for very small values", () => {
    // Force the use of the fallback cosh implementation
    const originalCosh = (Math as any).cosh;
    (Math as any).cosh = undefined;

    try {
      const z = new Complex(1e-10, 0);
      const result = z.cosh();
      // The original fallback uses Taylor approximation for |x| < 1e-9
      // The mutated fallback always uses the general formula
      // For x=1e-10, the Taylor approximation (1-x) should be used
      const expectedTaylor = 1 - 1e-10;
      const expectedGeneral = (Math.exp(1e-10) + Math.exp(-1e-10)) * 0.5;
      // The original should be exactly the Taylor approximation
      expect(result.re).toBeCloseTo(expectedTaylor, 15);
      expect(result.im).toBe(0);
    } finally {
      // Restore original Math.cosh
      (Math as any).cosh = originalCosh;
    }
  });
});