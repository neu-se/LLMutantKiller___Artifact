// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7abceb4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsch', () => {
  it('should correctly handle complex numbers with non-zero imaginary part', () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // The mutation changes the condition from `if (b === 0)` to `if (true)`
    // which would incorrectly treat all cases as real numbers
    // This test verifies the correct path is taken for complex numbers
    // Using a broader tolerance to account for floating point precision
    expect(result.re).toBeCloseTo(0.5306, 4);
    expect(result.im).toBeCloseTo(-0.4523, 4);
  });
});