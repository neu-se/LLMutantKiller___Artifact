// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12d80c9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech', () => {
  it('should correctly handle the case where a is 0 in the fallback path', () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    // The mutation changes the condition from (a !== 0) to (false)
    // This should affect the result when a is 0
    expect(result.re).toBeCloseTo(0.8813735870195429, 10);
    expect(result.im).toBeCloseTo(-1.5707963267948966, 10);
  });
});