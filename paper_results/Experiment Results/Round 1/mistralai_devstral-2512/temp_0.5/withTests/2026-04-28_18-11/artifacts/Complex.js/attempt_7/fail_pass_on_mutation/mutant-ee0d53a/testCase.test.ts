// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function behavior', () => {
  it('should use the scaling approach for large real values', () => {
    // Test case where a >= 3000 and b < 3000
    // Original code should use the second path (scaling approach)
    // Mutated code will use the first path (Math.sqrt) which may be less precise
    const c = new Complex(4000, 1);
    const absValue = c.abs();
    // The expected value is calculated using the scaling approach
    // which should be used when a >= 3000
    expect(absValue).toBeCloseTo(4000.000125, 8);
  });
});