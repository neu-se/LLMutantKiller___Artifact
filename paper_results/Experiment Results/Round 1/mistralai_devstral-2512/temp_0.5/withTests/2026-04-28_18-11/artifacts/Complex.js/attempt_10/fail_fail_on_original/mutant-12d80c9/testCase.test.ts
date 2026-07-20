// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12d80c9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex#asech', () => {
  it('should handle the case where a is 0.9 and b is 0', () => {
    const c = new Complex(0.9, 0);
    const result = c.asech();
    expect(result.re).toBeCloseTo(0.4522784471511778, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});