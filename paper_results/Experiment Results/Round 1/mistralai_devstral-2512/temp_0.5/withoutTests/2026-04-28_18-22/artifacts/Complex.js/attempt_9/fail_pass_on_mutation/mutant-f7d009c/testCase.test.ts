// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f7d009c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function edge case', () => {
  it('should correctly handle the boundary case where b equals exactly 3000', () => {
    const c = new Complex(3000, 3000);
    const absValue = c.abs();
    // The original code uses b < 3000, so when b === 3000 it uses the alternative calculation
    // The mutated code uses b <= 3000, which would use the first branch
    // The alternative calculation should be more precise for large numbers
    const expected = 3000 * Math.sqrt(2);
    // Using exact equality to catch any precision differences
    expect(absValue).toBe(expected);
  });
});