// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f7d009c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function edge case', () => {
  it('should correctly handle the boundary case where b equals 3000', () => {
    const c = new Complex(3000, 3000);
    const abs = c.abs();
    // The original code uses b < 3000, so when b === 3000 it should use the alternative calculation
    // The mutated code uses b <= 3000, which would incorrectly use the first branch
    // We expect the result to be exactly sqrt(3000^2 + 3000^2) = sqrt(18000000) = 3000*sqrt(2)
    const expected = 3000 * Math.sqrt(2);
    expect(abs).toBeCloseTo(expected, 10);
  });
});