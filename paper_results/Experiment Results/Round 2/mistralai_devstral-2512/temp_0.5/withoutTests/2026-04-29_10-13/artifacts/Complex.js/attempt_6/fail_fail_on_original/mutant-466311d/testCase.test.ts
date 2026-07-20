// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.logHypot mutation test', () => {
  it('should correctly compute logHypot for large values', () => {
    // Test with values where _a >= 3000 and _b < 3000
    // This exposes the mutation where the condition was changed from
    // (_a < 3000 && _b < 3000) to (true && _b < 3000)
    const a = 4000; // Greater than 3000
    const b = 1000; // Less than 3000

    // Create a complex number that will use logHypot internally
    const c = new Complex(a, b);
    const result = c.log();

    // Calculate what the original code should produce (overflow-safe path)
    const expectedResult = 0.5 * Math.log(a * a + b * b) + Math.LN2;

    // The original code should use overflow-safe calculation
    expect(result.re).toBeCloseTo(expectedResult, 10);
  });
});