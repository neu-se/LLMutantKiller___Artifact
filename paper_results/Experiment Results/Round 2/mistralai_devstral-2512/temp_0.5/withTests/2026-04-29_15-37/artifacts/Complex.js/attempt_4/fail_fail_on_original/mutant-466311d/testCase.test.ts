// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot", () => {
  it("should correctly compute log for values that trigger overflow protection", () => {
    // Test with values that should trigger the overflow protection path in original code
    // but will incorrectly use the normal path in mutated code
    const a = 4000;
    const b = 4000;
    const c = new Complex(a, b);
    const result = c.log();

    // The original code should use the overflow protection path and compute:
    // 0.5 * Math.log(a*a + b*b) + Math.LN2
    // The mutated code will incorrectly use the normal path and compute:
    // Math.log(a*a + b*b) * 0.5
    // These should be different by exactly Math.LN2 (~0.69314718056)

    // Calculate what the mutated version would produce
    const mutatedExpectedRe = Math.log(a * a + b * b) * 0.5;
    const expectedIm = Math.atan2(b, a);

    // The test should fail on mutated code because it will produce the wrong result
    expect(result.re).not.toBeCloseTo(mutatedExpectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});