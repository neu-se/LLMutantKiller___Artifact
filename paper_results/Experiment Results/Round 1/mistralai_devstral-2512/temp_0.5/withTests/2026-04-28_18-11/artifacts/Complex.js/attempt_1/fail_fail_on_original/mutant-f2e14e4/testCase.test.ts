// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f2e14e4/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should correctly compute acot for a complex number with non-zero real and imaginary parts', () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    // The mutation changes the sign of the imaginary part in the acot calculation
    // For input (1, 1), the correct result should have a specific imaginary component
    // We'll verify the imaginary part is negative (original) vs positive (mutated)
    expect(result.im).toBeCloseTo(-0.3466, 4);
  });
});