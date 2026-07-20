// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f7d009c/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function boundary condition', () => {
  it('should use the alternative calculation when b equals exactly 3000', () => {
    // Create a complex number where both components are exactly 3000
    const c = new Complex(3000, 3000);
    const absValue = c.abs();
    // The expected value is sqrt(3000^2 + 3000^2) = 3000*sqrt(2)
    const expected = 3000 * Math.sqrt(2);
    // The test should pass on original (b < 3000) but fail on mutated (b <= 3000)
    // because the mutated version would incorrectly use the first branch
    expect(absValue).toBeCloseTo(expected, 10);
  });
});