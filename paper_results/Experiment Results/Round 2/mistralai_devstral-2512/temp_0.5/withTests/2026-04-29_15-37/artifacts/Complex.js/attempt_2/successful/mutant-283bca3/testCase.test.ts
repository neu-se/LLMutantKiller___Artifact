// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-283bca3/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc', () => {
  it('should correctly compute the arcus cosecans for a complex number with non-zero imaginary part', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    // The mutation changes the sign of the imaginary part in the acsc calculation
    // For input (1, 1), the correct result should have a specific imaginary component
    // The mutated version will produce a result with the opposite sign in the imaginary part
    expect(result.im).toBeCloseTo(-0.5306, 4);
  });
});