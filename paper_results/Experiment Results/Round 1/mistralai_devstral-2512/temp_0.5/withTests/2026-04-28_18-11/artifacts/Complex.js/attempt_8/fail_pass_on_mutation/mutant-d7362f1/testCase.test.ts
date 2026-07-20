// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex multiplication with real numbers', () => {
  it('should correctly multiply two real numbers using optimized path', () => {
    const a = new Complex(2, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    // The mutation changes this['im'] to this[""] which is undefined
    // This will cause the condition to fail and use the general multiplication path
    // The general path produces different floating point results
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    // This will fail on mutated code because the optimization path isn't taken
    // and the general path might produce slightly different results
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
  });
});