// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-16f1215/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc() mutation test', () => {
  it('should correctly handle non-zero imaginary component', () => {
    const result = new Complex(1, 1).acsc();
    const expectedRe = 0.6635582935835653;
    const expectedIm = -0.5825285240725515;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});