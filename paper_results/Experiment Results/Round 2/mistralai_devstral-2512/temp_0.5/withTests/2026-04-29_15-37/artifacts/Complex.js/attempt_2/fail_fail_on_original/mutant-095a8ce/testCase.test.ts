// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-095a8ce/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc', () => {
  it('should handle non-zero complex numbers correctly', () => {
    const result = new Complex(1, 1).acsc();
    expect(result.re).toBeCloseTo(0.6674563842847037, 10);
    expect(result.im).toBeCloseTo(-0.48121182505960347, 10);
  });
});