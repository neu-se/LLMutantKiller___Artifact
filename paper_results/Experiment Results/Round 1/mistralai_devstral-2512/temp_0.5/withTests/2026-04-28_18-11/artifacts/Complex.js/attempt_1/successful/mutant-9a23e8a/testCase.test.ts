// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9a23e8a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsch()', () => {
  it('should correctly compute the inverse hyperbolic cosecant for real numbers', () => {
    const z = new Complex(2, 0);
    const result = z.acsch();
    const expectedRe = Math.log(2 + Math.sqrt(4 + 1));
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBe(0);
  });
});