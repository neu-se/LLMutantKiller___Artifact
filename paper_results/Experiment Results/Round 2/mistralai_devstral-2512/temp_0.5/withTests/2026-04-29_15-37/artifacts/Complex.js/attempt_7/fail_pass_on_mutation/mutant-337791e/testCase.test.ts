// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-337791e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.exp()', () => {
  it('should return correct result for complex number with non-zero imaginary part', () => {
    const complex = new Complex(1, 1);
    const result = complex.exp();
    const expectedRe = Math.exp(1) * Math.cos(1);
    const expectedIm = Math.exp(1) * Math.sin(1);
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});