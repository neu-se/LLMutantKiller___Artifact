// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92ea616/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot method', () => {
  it('should correctly handle non-zero complex numbers', () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    // The mutation changes the condition from (d !== 0) to (d === 0)
    // For a non-zero complex number, d should not be zero, so the original code
    // should take the first branch, while the mutated code would take the second branch
    // This should result in different behavior that we can observe
    expect(result.re).toBeCloseTo(0.4023594781, 6);
    expect(result.im).toBeCloseTo(-0.5535743588, 6);
  });
});