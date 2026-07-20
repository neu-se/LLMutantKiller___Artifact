// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.logHypot mutation test', () => {
  it('should correctly compute logHypot for large values', () => {
    // This test targets the mutation in logHypot where the condition was changed from
    // (_a < 3000 && _b < 3000) to (true && _b < 3000)
    // We test with a value where _a >= 3000 but _b < 3000 to expose the mutation
    const a = 4000; // Greater than 3000
    const b = 1000; // Less than 3000

    // Create a complex number that will use logHypot internally
    const c = new Complex(a, b);
    const result = c.log();

    // The real part of log should be logHypot(a, b)
    // For the original code, this should use the overflow-safe path
    // For the mutated code, it will incorrectly use the simple path
    const expectedReal = Math.log(a * a + b * b) * 0.5;

    // We expect the mutation to produce a different result
    // The original code should handle this case with the overflow-safe calculation
    expect(result.re).not.toBeCloseTo(expectedReal, 10);
  });
});