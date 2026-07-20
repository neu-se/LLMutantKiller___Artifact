// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f7d009c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function boundary case', () => {
  it('should correctly calculate magnitude when b equals exactly 3000', () => {
    const c = new Complex(3000, 3000);
    const absValue = c.abs();
    const expected = 3000 * Math.sqrt(2);
    // The original code uses b < 3000, so when b === 3000 it uses the alternative calculation
    // The mutated code uses b <= 3000, which would use the first branch
    // The first branch might have precision issues with large numbers
    expect(absValue).toBeCloseTo(expected, 12);
  });
});