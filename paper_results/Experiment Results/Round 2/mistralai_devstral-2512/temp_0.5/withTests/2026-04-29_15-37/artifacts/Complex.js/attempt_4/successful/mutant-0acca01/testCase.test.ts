// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0acca01/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acoth()', () => {
  it('should produce different results for acoth(2+3i) between original and mutated code', () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation changes a/d to a*d in the acoth calculation
    // For input (2,3), d = 2*2 + 3*3 = 13
    // Original: a/d = 2/13 ≈ 0.1538
    // Mutated: a*d = 2*13 = 26
    // This will produce significantly different results
    // We'll check that the real part is close to the expected value from original code
    expect(result.re).toBeCloseTo(0.1469, 3);
    // The imaginary part should also be close to expected value
    expect(result.im).toBeCloseTo(-0.2318, 3);
  });
});