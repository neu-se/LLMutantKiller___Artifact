// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot mutation test", () => {
  it("should detect incorrect logHypot calculation for large a values", () => {
    // This test targets the mutation where the condition `_a < 3000` was changed to `true`
    // For a >= 3000 and b < 3000, the original code uses the optimized path
    // while the mutated code incorrectly uses the fallback path
    const a = 3500;
    const b = 1000;
    const complex = new Complex(a, b);
    const result = complex.log();

    // Calculate expected values using the correct formula
    const expectedRe = Math.log(Math.sqrt(a * a + b * b));
    const expectedIm = Math.atan2(b, a);

    // The mutation causes incorrect calculation when a >= 3000
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});