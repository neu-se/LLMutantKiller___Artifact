// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-23e5676/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc()', () => {
  it('should compute the correct arc cosecant for a specific complex number', () => {
    const c = new Complex(1, 1);
    const result = c.acsc();
    // The mutation changes a/d to a*d in the acsc method
    // For input (1,1), the original code should produce a specific result
    // that will be different when the mutation is present
    expect(result.re).toBeCloseTo(0.6662394324925153, 10);
    expect(result.im).toBeCloseTo(-0.4023594781085251, 10);
  });
});