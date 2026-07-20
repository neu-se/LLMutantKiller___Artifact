// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.logHypot mutation test', () => {
  it('should use overflow-safe calculation when a >= 3000', () => {
    // Test with values where _a >= 3000 and _b < 3000
    const a = 4000; // Greater than 3000
    const b = 1000; // Less than 3000

    // Create a complex number that will use logHypot internally
    const c = new Complex(a, b);
    const result = c.log();

    // Calculate what the simple path would produce (what mutated code does)
    const simpleResult = Math.log(a * a + b * b) * 0.5;

    // The original code should NOT use the simple path when a >= 3000
    // So the result should be different from simpleResult
    expect(result.re).not.toBeCloseTo(simpleResult, 10);
  });
});