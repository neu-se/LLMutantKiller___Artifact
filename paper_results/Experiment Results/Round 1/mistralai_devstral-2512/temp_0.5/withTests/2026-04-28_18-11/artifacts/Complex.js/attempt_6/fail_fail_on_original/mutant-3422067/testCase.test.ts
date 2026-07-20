// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot function edge case', () => {
  it('should correctly handle equal values in hypot calculation', () => {
    // Create a complex number that will trigger the hypot function with equal values
    const c = new Complex(3000, 3000);
    const abs = c.abs();
    // The original code uses a < b, so when a == b, it should use the first branch
    // The mutated code uses a <= b, which would incorrectly use the second branch when a == b
    // This should result in a different calculation
    // Using a reasonable precision that should catch the difference
    expect(abs).toBeCloseTo(4242.640687119285, 12);
  });
});