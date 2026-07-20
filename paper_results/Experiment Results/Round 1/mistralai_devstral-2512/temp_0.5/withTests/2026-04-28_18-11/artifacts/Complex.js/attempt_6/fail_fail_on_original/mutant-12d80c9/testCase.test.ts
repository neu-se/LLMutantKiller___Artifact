// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12d80c9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex#asech', () => {
  it('should handle the case where a is non-zero and b is non-zero', () => {
    const c = new Complex(0.1, 0.1);
    const result = c.asech();
    expect(result.re).toBeCloseTo(2.2924316695611777, 10);
    expect(result.im).toBeCloseTo(-1.5707963267948966, 10);
  });
});