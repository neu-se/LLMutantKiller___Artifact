// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-103e5dc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc()', () => {
  it('should correctly compute the cosecant for a complex number with real part 0.5', () => {
    const c = new Complex(0.5, 0);
    const result = c.csc();
    // For a=0.5, b=0:
    // Original d = 0.5 * cosh(0) - 0.5 * cos(1) = 0.5 * 1 - 0.5 * 0.5403 ≈ 0.5 - 0.2702 ≈ 0.2298
    // Mutated d = 0.5 * cosh(0) - 0.5 * cos(4) = 0.5 - 0.5 * (-0.6536) ≈ 0.5 + 0.3268 ≈ 0.8268
    // This will produce different results
    expect(result.re).toBeCloseTo(4.3309, 3);
    expect(result.im).toBeCloseTo(0, 3);
  });
});