// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot", () => {
  it("should correctly handle the boundary condition at a=3000", () => {
    // Test exactly at the boundary where a=3000 and b<3000
    // Original code: _a < 3000 && _b < 3000 → false (uses overflow path)
    // Mutated code: true && _b < 3000 → true (uses simple path)
    const a = 3000;
    const b = 2000;
    const c = new Complex(a, b);
    const result = c.log();

    // Calculate what each path would produce
    const simplePathResult = Math.log(a * a + b * b) * 0.5;
    const overflowPathResult = 0.5 * Math.log(a * a + b * b) + Math.LN2;

    // On original code, result should match overflowPathResult
    // On mutated code, result will match simplePathResult
    // We check that the result matches the overflow path
    expect(result.re).toBeCloseTo(overflowPathResult, 10);
    expect(result.im).toBeCloseTo(Math.atan2(b, a), 10);
  });
});