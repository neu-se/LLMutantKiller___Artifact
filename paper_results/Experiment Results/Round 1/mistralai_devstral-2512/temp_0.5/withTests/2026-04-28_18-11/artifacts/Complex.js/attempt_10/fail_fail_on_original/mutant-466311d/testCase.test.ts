// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot mutation test", () => {
  it("should detect incorrect logHypot calculation when a >= 3000 and b < 3000", () => {
    // This test specifically targets the mutation where `_a < 3000` was changed to `true`
    // For values where a >= 3000 and b < 3000, the original code uses the optimized path
    // while the mutated code incorrectly uses the fallback path
    const a = 3500;
    const b = 1000;
    const complex = new Complex(a, b);
    const result = complex.log();

    // Calculate what the original code should produce using the optimized path
    const expectedRe = 0.5 * Math.log(a * a + b * b) + Math.LN2;
    expect(result.re).toBeCloseTo(expectedRe, 10);

    // Verify the imaginary part remains correct
    const expectedIm = Math.atan2(b, a);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});