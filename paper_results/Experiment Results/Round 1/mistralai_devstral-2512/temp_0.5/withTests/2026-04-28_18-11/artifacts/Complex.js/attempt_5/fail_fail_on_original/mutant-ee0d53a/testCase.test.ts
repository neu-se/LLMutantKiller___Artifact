// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex hypot function behavior', () => {
  it('should use the optimized path for small values and standard path for large values', () => {
    // Test case where a >= 3000 but b < 3000
    // Original code should use the second path (a < b check)
    // Mutated code will always use the first path (Math.sqrt)
    const c1 = new Complex(3500, 2000);
    const abs1 = c1.abs();

    // Test case where both a and b >= 3000
    // Original code should use the second path (a >= b)
    // Mutated code will use the first path (Math.sqrt) which may overflow
    const c2 = new Complex(3500, 3500);
    const abs2 = c2.abs();

    // Verify the results are different between the two approaches
    // The mutation changes which path is taken for a >= 3000
    expect(abs1).toBeCloseTo(4031.128874149478, 10);
    expect(abs2).toBeCloseTo(4949.747468305833, 10);
  });
});