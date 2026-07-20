// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot", () => {
  it("should correctly compute log(sqrt(a^2+b^2)) for large values", () => {
    // This test targets the mutation in logHypot where the condition `_a < 3000` was changed to `true`
    // We use large values that would trigger the overflow protection path in the original code
    const a = 4000;
    const b = 4000;
    const c = new Complex(a, b);
    const result = c.log();
    // The expected result is computed as 0.5 * Math.log(a*a + b*b) + Math.LN2
    // This is the formula used in the overflow protection path
    const expectedRe = 0.5 * Math.log(a * a + b * b) + Math.LN2;
    const expectedIm = Math.atan2(b, a);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});