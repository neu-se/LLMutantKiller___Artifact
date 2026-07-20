// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f7d009c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function precision test', () => {
  it('should handle the boundary case where b equals exactly 3000 with high precision', () => {
    const c = new Complex(3000, 3000);
    const absValue = c.abs();
    const expected = 3000 * Math.sqrt(2);
    // This test will fail on the mutated version because when b === 3000,
    // the mutated code will use the first branch (Math.sqrt(a*a + b*b))
    // which could have precision issues for large numbers, while the original
    // correctly uses the alternative calculation for this boundary case
    expect(absValue).toBe(expected);
  });
});