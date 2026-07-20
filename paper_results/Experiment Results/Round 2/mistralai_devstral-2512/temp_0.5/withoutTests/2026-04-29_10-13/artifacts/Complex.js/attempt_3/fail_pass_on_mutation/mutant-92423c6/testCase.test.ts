// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92423c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex cosm1 function', () => {
  it('should correctly compute cos(x) - 1 for small x values', () => {
    const x = 0.1;
    const c = new Complex(0, x);
    const result = c.expm1();
    const expectedRe = Math.cos(x) - 1;
    const expectedIm = Math.sin(x);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});