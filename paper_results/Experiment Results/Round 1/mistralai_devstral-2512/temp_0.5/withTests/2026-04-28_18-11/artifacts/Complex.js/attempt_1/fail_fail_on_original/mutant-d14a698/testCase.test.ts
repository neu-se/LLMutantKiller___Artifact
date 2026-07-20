// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d14a698/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asec()', () => {
  it('should correctly handle the case when a=0 and b=0', () => {
    const c = new Complex(0, 0);
    const result = c.asec();
    expect(result.toString()).toBe('NaN');
  });
});