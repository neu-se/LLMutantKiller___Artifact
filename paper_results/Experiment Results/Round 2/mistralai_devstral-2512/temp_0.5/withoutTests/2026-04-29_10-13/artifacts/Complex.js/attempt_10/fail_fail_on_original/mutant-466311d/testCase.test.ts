// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.logHypot mutation test', () => {
  it('should use overflow-safe path when a >= 3000 and b < 3000', () => {
    // Test with values where _a >= 3000 and _b < 3000
    const a = 4000; // Greater than 3000
    const b = 1000; // Less than 3000

    // Create a complex number that will use logHypot internally
    const c = new Complex(a, b);
    const result = c.log();

    // Calculate what the simple path would produce (what mutated code does)
    const simpleResult = Math.log(a * a + b * b) * 0.5;

    // Calculate what the overflow-safe path should produce
    const overflowSafeResult = 0.5 * Math.log(a * a + b * b) + Math.LN2;

    // The original code should use overflow-safe path and produce overflowSafeResult
    // The mutated code will use simple path and produce simpleResult
    expect(result.re).toBeCloseTo(overflowSafeResult, 10);
  });
});