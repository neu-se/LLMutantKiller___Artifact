// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-16f1215/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc() mutation test', () => {
  it('should correctly handle edge case with zero real and non-zero imaginary', () => {
    const result = new Complex(0, 1).acsc();
    expect(result.re).toBeCloseTo(0.881373587019543, 10);
    expect(result.im).toBeCloseTo(-1.5707963267948966, 10);
  });
});