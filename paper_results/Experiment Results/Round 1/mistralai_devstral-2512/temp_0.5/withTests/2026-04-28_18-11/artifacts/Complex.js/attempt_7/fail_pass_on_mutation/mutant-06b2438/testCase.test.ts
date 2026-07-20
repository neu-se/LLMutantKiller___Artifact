// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asinh()', () => {
  it('should correctly compute asinh for a specific complex number', () => {
    const c = new Complex(2, 3);
    const result = c.asinh();
    // These are the expected values from the original implementation
    expect(result.re).toBeCloseTo(1.968637925793096);
    expect(result.im).toBeCloseTo(0.9646585044076028);
  });
});