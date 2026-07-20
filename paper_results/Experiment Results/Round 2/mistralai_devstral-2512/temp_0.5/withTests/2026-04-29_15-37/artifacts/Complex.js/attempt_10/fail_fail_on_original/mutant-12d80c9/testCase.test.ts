// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12d80c9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech', () => {
  it('should correctly handle the fallback case when d is zero and a is non-zero', () => {
    // This test case should trigger the fallback path where the mutation matters
    // We need a case where d becomes zero but a is non-zero
    const c = new Complex(1, 1);
    const result = c.asech();
    // The original code would use a/0 when a !== 0 in the fallback path
    // The mutated code always uses 0
    expect(result.re).toBe(Infinity);
  });
});