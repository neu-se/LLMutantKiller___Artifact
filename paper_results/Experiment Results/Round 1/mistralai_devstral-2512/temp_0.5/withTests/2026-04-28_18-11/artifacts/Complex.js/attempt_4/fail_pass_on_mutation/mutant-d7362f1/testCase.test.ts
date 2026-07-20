// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex multiplication optimization path', () => {
  it('should use the optimized path for real numbers and produce correct result', () => {
    const a = new Complex(2.5, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    // The mutation changes this['im'] to this[""] which would cause a type error
    // when trying to access property with empty string key
    expect(result.re).toBe(10);
    expect(result.im).toBe(0);
  });
});