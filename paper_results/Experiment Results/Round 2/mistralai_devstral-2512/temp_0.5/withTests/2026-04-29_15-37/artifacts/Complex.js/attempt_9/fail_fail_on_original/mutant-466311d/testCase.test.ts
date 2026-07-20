// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot mutation", () => {
  it("should detect when the condition is incorrectly modified", () => {
    // Test with values where a >= 3000 and b >= 3000
    // Both original and mutated should use simple path
    const c1 = new Complex(4000, 4000);
    const result1 = c1.log();

    // Test with values where a < 3000 and b < 3000
    // Both original and mutated should use simple path
    const c2 = new Complex(2000, 2000);
    const result2 = c2.log();

    // Test with values where a >= 3000 but b < 3000
    // Original should use overflow path, mutated should use simple path
    const c3 = new Complex(3500, 2000);
    const result3 = c3.log();

    // Calculate what the simple path would produce
    const simplePathResult = Math.log(3500 * 3500 + 2000 * 2000) * 0.5;

    // On original code, result3 should NOT match simplePathResult
    // On mutated code, result3 WILL match simplePathResult
    expect(Math.abs(result3.re - simplePathResult)).toBeGreaterThan(0.1);
    expect(result3.im).toBeCloseTo(Math.atan2(2000, 3500), 10);
  });
});