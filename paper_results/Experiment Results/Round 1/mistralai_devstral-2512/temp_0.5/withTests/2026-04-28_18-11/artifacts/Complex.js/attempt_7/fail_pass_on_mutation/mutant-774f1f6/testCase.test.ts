// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-774f1f6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number parsing with array', () => {
  it('should correctly parse complex number from array', () => {
    const c = new Complex([2, 7]);
    expect(c.re).toBe(2);
    expect(c.im).toBe(7);
  });
});