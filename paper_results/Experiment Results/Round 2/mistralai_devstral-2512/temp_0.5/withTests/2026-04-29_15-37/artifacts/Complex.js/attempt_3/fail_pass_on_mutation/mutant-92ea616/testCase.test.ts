// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92ea616/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot method', () => {
  it('should handle non-zero complex numbers correctly', () => {
    const c = new Complex(1, 0);
    const result = c.acot();
    // The mutation changes the condition from (d !== 0) to (d === 0)
    // For a non-zero complex number (1,0), d should be 1 (not zero)
    // Original code should take first branch, mutated code would take second branch
    // This should produce different results
    expect(result.re).toBeCloseTo(0.7853981634, 6);
    expect(result.im).toBeCloseTo(0, 6);
  });
});