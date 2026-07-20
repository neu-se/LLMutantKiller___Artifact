// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7abceb4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsch', () => {
  it('should correctly compute acsch for a real number', () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    const expectedRe = Math.log(2 + Math.sqrt(2 * 2 + 1));
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBe(0);
  });
});