// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should correctly compute hypot for values where a >= 3000 and b < 3000', () => {
    const c = new Complex(3500, 2000);
    const absValue = c.abs();
    expect(absValue).toBeCloseTo(4031.128874, 5);
  });
});