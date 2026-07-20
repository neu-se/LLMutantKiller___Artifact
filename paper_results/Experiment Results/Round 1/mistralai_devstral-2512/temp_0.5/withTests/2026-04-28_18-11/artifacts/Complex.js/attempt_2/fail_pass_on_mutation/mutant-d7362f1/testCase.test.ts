// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex multiplication edge case', () => {
  it('should handle multiplication with zero imaginary part correctly', () => {
    const a = new Complex(2, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    expect(result.isNaN()).toBe(false);
  });
});