// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92ea616/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot method', () => {
  it('should return different results when mutation is present', () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    // The mutation changes the condition from (d !== 0) to (d === 0)
    // For (1,1), d = 1*1 + 1*1 = 2 (not zero)
    // Original code should take first branch (atanh), mutated code would take second branch
    // The second branch would create a complex number with Infinity components
    // This should produce different results
    expect(result.isFinite()).toBe(true);
  });
});