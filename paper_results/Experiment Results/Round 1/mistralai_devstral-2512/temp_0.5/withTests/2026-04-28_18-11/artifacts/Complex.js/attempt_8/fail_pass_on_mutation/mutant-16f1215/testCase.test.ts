// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-16f1215/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc() mutation test', () => {
  it('should correctly handle non-zero real and zero imaginary components', () => {
    const result = new Complex(2, 0).acsc();
    expect(result.re).toBeCloseTo(0.5235987755982989, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});