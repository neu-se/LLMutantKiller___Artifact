// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js hypot function mutation', () => {
  it('should correctly compute hypot for very large values where a >= 3000', () => {
    const c = new Complex(1e10, 1e5);
    const absValue = c.abs();
    // The original code uses the optimized path for a >= 3000
    // The mutated code will use the simple path (Math.sqrt(a*a + b*b)) which will overflow
    expect(absValue).toBeCloseTo(1e10, 0);
  });
});