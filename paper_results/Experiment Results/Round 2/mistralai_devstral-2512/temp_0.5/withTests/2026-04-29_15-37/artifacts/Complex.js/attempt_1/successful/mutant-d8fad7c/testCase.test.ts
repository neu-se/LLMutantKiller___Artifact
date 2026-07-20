// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d8fad7c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsch()', () => {
  it('should correctly compute acsch for non-zero real numbers', () => {
    const result = new Complex(2, 0).acsch();
    const expectedRe = Math.log(2 + Math.sqrt(4 + 1));
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(0);
  });
});