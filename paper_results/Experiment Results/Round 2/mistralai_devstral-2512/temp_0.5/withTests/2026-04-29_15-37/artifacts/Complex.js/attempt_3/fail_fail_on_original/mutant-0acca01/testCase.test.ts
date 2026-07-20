// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0acca01/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acoth()', () => {
  it('should compute acoth(2+3i) correctly', () => {
    const c = new Complex(2, 3);
    const result = c.acoth();
    // The mutation changes division to multiplication in the acoth calculation
    // This will produce significantly different results
    // We'll verify the result matches the expected value from the original implementation
    expect(result.re).toBeCloseTo(0.1469, 4);
    expect(result.im).toBeCloseTo(-0.3077, 4);
  });
});