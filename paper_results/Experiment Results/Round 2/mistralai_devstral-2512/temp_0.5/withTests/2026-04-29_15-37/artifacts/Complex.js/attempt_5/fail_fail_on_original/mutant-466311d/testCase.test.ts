// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot", () => {
  it("should use overflow protection for large values", () => {
    // Test with values that should trigger the overflow protection path
    const a = 4000;
    const b = 4000;
    const c = new Complex(a, b);
    const result = c.log();

    // The original code should use overflow protection and compute:
    // 0.5 * Math.log(a*a + b*b) + Math.LN2
    const originalExpectedRe = 0.5 * Math.log(a * a + b * b) + Math.LN2;

    // The mutated code will incorrectly use the normal path and compute:
    // Math.log(a*a + b*b) * 0.5
    const mutatedExpectedRe = Math.log(a * a + b * b) * 0.5;

    // The difference between these should be exactly Math.LN2
    const expectedDifference = Math.LN2;

    // On original code, result should match originalExpectedRe
    // On mutated code, result will match mutatedExpectedRe
    expect(Math.abs(result.re - originalExpectedRe)).toBeLessThan(1e-10);
    expect(Math.abs(result.re - mutatedExpectedRe - expectedDifference)).toBeLessThan(1e-10);
  });
});