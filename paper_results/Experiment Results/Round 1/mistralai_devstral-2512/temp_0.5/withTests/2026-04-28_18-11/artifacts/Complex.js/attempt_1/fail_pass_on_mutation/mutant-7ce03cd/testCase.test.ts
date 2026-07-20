// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7ce03cd/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex multiplication with infinity and zero', () => {
  it('should return NaN when multiplying infinity by zero', () => {
    const infinity = new Complex(Infinity, 0);
    const zero = new Complex(0, 0);
    const result = infinity.mul(zero);
    expect(result.isNaN()).toBe(true);
  });
});