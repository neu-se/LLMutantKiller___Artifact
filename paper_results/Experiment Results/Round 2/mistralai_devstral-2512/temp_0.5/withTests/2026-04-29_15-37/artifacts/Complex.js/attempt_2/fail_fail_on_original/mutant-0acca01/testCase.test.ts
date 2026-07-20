// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0acca01/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acoth()', () => {
  it('should compute acoth(2+3i) with correct division behavior', () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The original code computes a/d (division)
    // The mutated code computes a*d (multiplication)
    // For input (2,3), d = 2*2 + 3*3 = 13
    // Original: a/d = 2/13 ≈ 0.1538
    // Mutated: a*d = 2*13 = 26
    // This will produce significantly different results
    expect(result.re).toBeCloseTo(0.0769, 4);
    expect(result.im).toBeCloseTo(-0.3077, 4);
  });
});