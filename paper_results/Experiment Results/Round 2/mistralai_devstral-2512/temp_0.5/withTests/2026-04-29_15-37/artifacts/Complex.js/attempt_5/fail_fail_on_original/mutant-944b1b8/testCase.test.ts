// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-944b1b8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asec', () => {
  it('should return NaN when both a and b are zero', () => {
    const c = new Complex(0, 0);
    const result = c.asec();
    // The mutation changes (a !== 0) to (true), which would incorrectly handle the case when a is 0
    // In the original code, when a is 0, it should return Infinity
    // In the mutated code, it will try to compute (0 / 0) which is NaN
    expect(result.isNaN()).toBe(true);
  });
});