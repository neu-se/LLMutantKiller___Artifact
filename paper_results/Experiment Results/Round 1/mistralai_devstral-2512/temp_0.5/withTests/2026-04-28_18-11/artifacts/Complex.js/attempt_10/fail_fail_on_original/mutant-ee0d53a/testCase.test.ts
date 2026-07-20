// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function behavior', () => {
  it('should use scaling approach for large real values', () => {
    // Test case where a >= 3000 and b < 3000
    // Original code uses scaling approach when a >= 3000
    // Mutated code uses direct Math.sqrt regardless of a's value
    const c = new Complex(3500, 1);
    const absValue = c.abs();

    // The scaling approach result (what original code should produce)
    const expectedScaling = 3500 * Math.sqrt(1 + Math.pow(1/3500, 2));
    expect(absValue).toBeCloseTo(expectedScaling, 13);

    // Verify it's not using the direct sqrt approach
    const directSqrt = Math.sqrt(3500*3500 + 1*1);
    expect(Math.abs(absValue - expectedScaling)).toBeLessThan(Math.abs(absValue - directSqrt));
  });
});