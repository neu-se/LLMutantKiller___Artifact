// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12d80c9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech', () => {
  it('should handle the case where a is non-zero but d is zero', () => {
    // Create a complex number where a is non-zero but d becomes zero
    // This should trigger the fallback path where the mutation matters
    const c = new Complex(1, 0);
    const result = c.asech();
    // The original code would use a/0 when a !== 0, mutated code always uses 0
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(0);
  });
});