// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function behavior', () => {
  it('should use different calculation paths for large real values', () => {
    // Test case specifically designed to expose the mutation
    // When a >= 3000 and b < 3000:
    // Original: uses scaling approach (a * Math.sqrt(1 + (b/a)^2))
    // Mutated: uses direct Math.sqrt(a^2 + b^2)
    const c = new Complex(3500, 1);
    const absValue = c.abs();

    // Calculate both possible results
    const directSqrt = Math.sqrt(3500*3500 + 1*1);
    const scaling = 3500 * Math.sqrt(1 + Math.pow(1/3500, 2));

    // The original code should use scaling approach
    // The mutated code will use direct sqrt
    // These values should be different enough to detect the mutation
    expect(absValue).toBeCloseTo(scaling, 14);
    expect(absValue).not.toBeCloseTo(directSqrt, 14);
  });
});