// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12d80c9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech', () => {
  it('should handle division by zero in the fallback path when a is 0', () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    // The mutation changes (a !== 0) to (false), which should affect the result
    // when a is 0 by forcing it to use the fallback path
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(-Infinity);
  });
});