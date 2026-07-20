// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function behavior', () => {
  it('should correctly handle large real values with small imaginary values', () => {
    // This test targets the mutation where the condition changes from
    // "if (a < 3000 && b < 3000)" to "if (true && b < 3000)"
    // When a >= 3000 and b < 3000, the original code uses the second path
    // while the mutated code uses the first path (Math.sqrt)
    const c = new Complex(3500, 1);
    const absValue = c.abs();
    // The expected value is calculated using the second path (scaling approach)
    // which should be used when a >= 3000
    expect(absValue).toBeCloseTo(3500.000142857143, 9);
  });
});