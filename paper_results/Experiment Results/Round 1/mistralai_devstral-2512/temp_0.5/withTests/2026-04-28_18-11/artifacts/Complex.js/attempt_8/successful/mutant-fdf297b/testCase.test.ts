// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fdf297b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex subtraction with infinity', () => {
  it('should return Infinity when subtracting finite from infinite', () => {
    const infinite = new Complex(Infinity, 0);
    const finite = new Complex(5, 0);
    const result = infinite.sub(finite);
    expect(result.isInfinite()).toBe(true);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});