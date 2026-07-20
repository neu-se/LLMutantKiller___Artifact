// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-64355c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asec', () => {
  it('should handle case where real component is 0 and imaginary component is non-zero', () => {
    const result = new Complex(0, 1).asec();
    expect(result.isNaN()).toBe(false);
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(1.5708, 3);
  });
});