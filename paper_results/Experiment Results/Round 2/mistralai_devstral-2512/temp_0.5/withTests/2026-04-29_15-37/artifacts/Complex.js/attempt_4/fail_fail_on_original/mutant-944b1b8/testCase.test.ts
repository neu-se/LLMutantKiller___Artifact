// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-944b1b8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asec', () => {
  it('should handle the case when a is 0 and b is non-zero correctly', () => {
    const c = new Complex(0, 1);
    const result = c.asec();
    // The mutation changes (a !== 0) to (true), which would incorrectly handle the case when a is 0
    // In the original code, when a is 0, it should use the second branch (a / 0)
    // In the mutated code, it will always use the first branch (a / 0) even when a is 0
    // This should produce different results for the imaginary part
    expect(result.im).toBeCloseTo(1.5707963267948966);
  });
});