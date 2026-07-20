// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-286c16a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asinh', () => {
  it('should compute the inverse hyperbolic sine of a complex number', () => {
    const z = new Complex(1, 1);
    const result = z.asinh();
    // Expected result calculated using the formula: asinh(a + bi) = asin(-i*(a + bi))
    // For z = 1 + i, asinh(1 + i) ≈ 0.6614 + 1.0613i
    expect(result.re).toBeCloseTo(0.6614, 4);
    expect(result.im).toBeCloseTo(1.0613, 4);
  });
});