// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosh function', () => {
  it('should correctly compute cosh for values where Math.exp(x) + Math.exp(-x) is used', () => {
    const c = new Complex(1.5, 0);
    const result = c.cosh();
    const expectedRe = (Math.exp(1.5) + Math.exp(-1.5)) * 0.5;
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});