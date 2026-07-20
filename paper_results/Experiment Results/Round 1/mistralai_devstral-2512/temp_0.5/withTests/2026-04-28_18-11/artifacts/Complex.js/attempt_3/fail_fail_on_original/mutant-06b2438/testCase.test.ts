// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asinh()', () => {
  it('should correctly compute asinh for a complex number', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asinh();
    expect(result.re).toBeCloseTo(0.48121182505960347);
    expect(result.im).toBeCloseTo(0.5);
  });
});