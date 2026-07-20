// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.logHypot mutation test', () => {
  it('should handle very large values correctly', () => {
    // Test with extremely large values where the difference between paths is clear
    const a = 1e100; // Extremely large value
    const b = 1; // Small value

    // Create a complex number that will use logHypot internally
    const c = new Complex(a, b);
    const result = c.log();

    // Calculate what the simple path would produce (what mutated code does)
    // This will overflow to Infinity
    const simpleResult = Math.log(a * a + b * b) * 0.5;

    // The original code should handle this without overflow
    // The mutated code will overflow to Infinity
    expect(result.re).not.toBe(Infinity);
    expect(Number.isFinite(result.re)).toBe(true);
  });
});