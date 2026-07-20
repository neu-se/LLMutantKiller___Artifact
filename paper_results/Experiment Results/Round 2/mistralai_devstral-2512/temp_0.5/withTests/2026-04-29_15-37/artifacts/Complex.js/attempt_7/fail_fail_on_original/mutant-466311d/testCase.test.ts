// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot", () => {
  it("should detect when overflow protection is incorrectly bypassed", () => {
    // Use a value where a >= 3000 but b < 3000
    // Original code should use overflow protection (since a >= 3000)
    // Mutated code will use simple path (since b < 3000)
    const a = 3500;  // >= 3000
    const b = 2000;  // < 3000
    const c = new Complex(a, b);
    const result = c.log();

    // Calculate what each path would produce
    const simplePathResult = Math.log(a * a + b * b) * 0.5;
    const overflowPathResult = 0.5 * Math.log(a * a + b * b) + Math.LN2;

    // The difference between paths is exactly Math.LN2
    const expectedDifference = Math.LN2;

    // On original code, result should be close to overflowPathResult
    // On mutated code, result will be close to simplePathResult
    // We check that the result is NOT using the simple path
    expect(Math.abs(result.re - simplePathResult)).toBeGreaterThan(expectedDifference/2);
    expect(result.im).toBeCloseTo(Math.atan2(b, a), 10);
  });
});