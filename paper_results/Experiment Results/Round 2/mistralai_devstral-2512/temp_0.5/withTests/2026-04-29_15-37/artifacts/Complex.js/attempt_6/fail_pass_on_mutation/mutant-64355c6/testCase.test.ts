// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-64355c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asec', () => {
  it('should handle non-zero real component with zero imaginary component', () => {
    const result = new Complex(2, 0).asec();
    expect(result.isNaN()).toBe(false);
    expect(result.im).toBeCloseTo(0);
  });
});