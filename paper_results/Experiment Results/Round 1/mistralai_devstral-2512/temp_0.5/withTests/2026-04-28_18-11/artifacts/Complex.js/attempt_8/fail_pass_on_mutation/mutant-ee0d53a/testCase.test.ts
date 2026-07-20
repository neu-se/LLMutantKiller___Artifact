// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function behavior', () => {
  it('should correctly compute hypot for values where a >= 3000 and b < 3000', () => {
    // Create a complex number where a >= 3000 and b < 3000
    // The mutation changes the condition from "a < 3000 && b < 3000" to "true && b < 3000"
    // This means when a >= 3000 and b < 3000, the original code uses the scaling approach
    // while the mutated code uses Math.sqrt which may produce different results
    const c = new Complex(3500, 2);
    const absValue = c.abs();

    // The expected value using the scaling approach (original behavior)
    // When a >= 3000, the original code uses: a * Math.sqrt(1 + (b/a)^2)
    const expected = 3500 * Math.sqrt(1 + Math.pow(2/3500, 2));
    expect(absValue).toBeCloseTo(expected, 12);
  });
});