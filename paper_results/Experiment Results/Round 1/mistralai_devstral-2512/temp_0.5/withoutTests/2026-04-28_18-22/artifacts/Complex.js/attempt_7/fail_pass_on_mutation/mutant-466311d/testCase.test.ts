// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.logHypot', () => {
  it('should correctly compute logHypot for values where a >= 3000 and b < 3000', () => {
    const a = 3500;
    const b = 1000;
    const c = new Complex(a, b);
    const result = c.log();
    // The mutation changes the condition from (_a < 3000 && _b < 3000) to (true && _b < 3000)
    // This means for a >= 3000 and b < 3000, the original code would use the alternative path
    // while the mutated code would incorrectly use the simple path
    const expectedRe = 0.5 * Math.log((a/2) * (a/2) + (b/2) * (b/2)) + Math.LN2;
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});