// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-103e5dc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc()', () => {
  it('should correctly compute the cosecant for a complex number with real part 1 and imaginary part 0', () => {
    const c = new Complex(1, 0);
    const result = c.csc();
    // For a=1, b=0:
    // Original d = 0.5 * cosh(0) - 0.5 * cos(2) = 0.5 * 1 - 0.5 * (-0.4161) ≈ 0.5 + 0.2081 ≈ 0.7081
    // Mutated d = 0.5 * cosh(0) - 0.5 * cos(2) = same as original (since 2/a = 2/1 = 2)
    // Let's test with a value where 2*a != 2/a
    const c2 = new Complex(2, 0);
    const result2 = c2.csc();
    // For a=2, b=0:
    // Original d = 0.5 * cosh(0) - 0.5 * cos(4) = 0.5 - 0.5 * (-0.6536) ≈ 0.5 + 0.3268 ≈ 0.8268
    // Mutated d = 0.5 * cosh(0) - 0.5 * cos(1) = 0.5 - 0.5 * 0.5403 ≈ 0.5 - 0.2702 ≈ 0.2298
    // This will produce different results
    expect(result2.re).toBeCloseTo(1.0998, 3);
    expect(result2.im).toBeCloseTo(0, 3);
  });
});