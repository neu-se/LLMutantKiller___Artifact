// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-49b0513/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.atnh', () => {
  it('should correctly compute the inverse hyperbolic tangent of a complex number', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    expect(result.re).toBeCloseTo(0.40235947810852507, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});