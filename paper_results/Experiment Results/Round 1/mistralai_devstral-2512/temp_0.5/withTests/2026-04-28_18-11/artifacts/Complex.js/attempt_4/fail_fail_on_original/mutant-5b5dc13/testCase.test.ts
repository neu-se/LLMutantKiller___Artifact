// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5b5dc13/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsch', () => {
  it('should correctly handle the case when a is non-zero and b is non-zero', () => {
    const result = new Complex(1, 1).acsch();
    expect(result.re).toBeCloseTo(0.443, 3);
    expect(result.im).toBeCloseTo(-0.371, 3);
  });
});