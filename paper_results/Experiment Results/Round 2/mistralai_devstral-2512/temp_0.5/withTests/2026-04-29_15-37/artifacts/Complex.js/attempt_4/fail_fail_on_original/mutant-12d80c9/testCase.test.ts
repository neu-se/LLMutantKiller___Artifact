// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-12d80c9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech', () => {
  it('should handle edge case where division by zero occurs in the original implementation', () => {
    const c = new Complex(0, 1);
    const result = c.asech();
    // The original code should handle this case differently than the mutated version
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI/2, 10);
  });
});