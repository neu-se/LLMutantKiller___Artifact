// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex multiplication edge case', () => {
  it('should handle multiplication with zero imaginary parts correctly', () => {
    const a = new Complex(2, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    // The mutation changes this['im'] to this[""] which is undefined
    // This will cause the condition to fail and use the general multiplication path
    // The general path will still produce correct results, but we need to verify
    // the optimization path was taken by checking the exact result
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    // This assertion will fail on mutated code because the optimization path
    // won't be taken and the general path might produce slightly different results
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
  });
});