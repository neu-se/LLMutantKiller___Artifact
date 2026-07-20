// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot mutation test", () => {
  it("should detect incorrect logHypot calculation for large a values", () => {
    // Test case specifically designed to expose the mutation
    // where `_a < 3000` was changed to `true`
    const a = 3500;
    const b = 1000;
    const complex = new Complex(a, b);
    const result = complex.log();

    // The original code should use the optimized path for a >= 3000
    // The mutated code will incorrectly use the fallback path
    // We test the exact value that would differ between the two paths
    const expectedRe = Math.log(Math.sqrt(a * a + b * b));
    expect(result.re).toBeCloseTo(expectedRe, 10);

    // Also verify the imaginary part
    const expectedIm = Math.atan2(b, a);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});