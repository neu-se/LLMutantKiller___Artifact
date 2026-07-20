// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3396602/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc', () => {
  it('should compute the cosecant of a complex number with specific real and imaginary parts', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.csc();
    const expectedRe = 1.092523205225305;
    const expectedIm = -0.4921125203510394;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});