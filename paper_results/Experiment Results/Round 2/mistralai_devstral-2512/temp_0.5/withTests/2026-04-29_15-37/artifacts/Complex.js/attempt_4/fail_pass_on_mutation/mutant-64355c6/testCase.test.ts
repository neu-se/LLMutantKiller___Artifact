// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-64355c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asec', () => {
  it('should return Infinity for asec(0, 0)', () => {
    const result = new Complex(0, 0).asec();
    expect(result.isInfinite()).toBe(true);
  });
});