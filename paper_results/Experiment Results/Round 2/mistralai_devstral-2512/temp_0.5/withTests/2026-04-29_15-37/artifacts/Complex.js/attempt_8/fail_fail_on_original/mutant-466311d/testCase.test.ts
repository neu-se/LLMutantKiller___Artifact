// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot", () => {
  it("should use overflow protection when a >= 3000 even if b < 3000", () => {
    // Test case where a >= 3000 but b < 3000
    // Original code should use overflow protection (since a >= 3000)
    // Mutated code will incorrectly use simple path (since b < 3000)
    const a = 3500;  // >= 3000
    const b = 2000;  // < 3000
    const c = new Complex(a, b);
    const result = c.log();

    // Calculate what each path produces
    const simplePathResult = Math.log(a * a + b * b) * 0.5;
    const overflowPathResult = 0.5 * Math.log(a * a + b * b) + Math.LN2;

    // On original code, result should match overflowPathResult
    // On mutated code, result will match simplePathResult
    expect(result.re).toBeCloseTo(overflowPathResult, 10);
    expect(result.im).toBeCloseTo(Math.atan2(b, a), 10);
  });
});