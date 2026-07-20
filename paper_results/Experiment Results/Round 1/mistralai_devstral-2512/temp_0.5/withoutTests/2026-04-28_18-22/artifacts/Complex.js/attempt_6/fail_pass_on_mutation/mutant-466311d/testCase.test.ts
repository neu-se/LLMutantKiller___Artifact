// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.logHypot', () => {
  it('should use the correct calculation path for large real values', () => {
    const a = 3500;
    const b = 1000;
    const c = new Complex(a, b);
    const result = c.log();
    // Original code should use the alternative path (not the simple path)
    // Mutated code will incorrectly use the simple path
    const expectedRe = 0.5 * Math.log((a/2) * (a/2) + (b/2) * (b/2)) + Math.LN2;
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});