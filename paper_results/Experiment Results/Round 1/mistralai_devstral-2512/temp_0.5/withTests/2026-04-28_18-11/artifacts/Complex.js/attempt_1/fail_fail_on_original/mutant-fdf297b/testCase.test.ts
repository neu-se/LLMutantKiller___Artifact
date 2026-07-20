// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-fdf297b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex subtraction with infinity', () => {
  it('should return NaN when subtracting a finite number from infinity', () => {
    const infinite = new Complex(Infinity, Infinity);
    const finite = new Complex(1, 1);
    const result = infinite.sub(finite);
    expect(result.isNaN()).toBe(true);
  });
});