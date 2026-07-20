// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f7d009c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function boundary test', () => {
  it('should handle the exact boundary case where b equals 3000', () => {
    const c = new Complex(2999, 3000);
    const absValue = c.abs();
    // The original code uses b < 3000, so when b === 3000 it uses the alternative calculation
    // The mutated code uses b <= 3000, which would use the first branch
    // This test specifically targets the boundary condition
    const expected = Math.sqrt(2999*2999 + 3000*3000);
    expect(absValue).toBeCloseTo(expected, 12);
  });
});