// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-103e5dc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc()', () => {
  it('should correctly compute the cosecant for a specific complex number', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.csc();
    // The mutation changes the denominator calculation in csc()
    // Original: var d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);
    // Mutated: var d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 / a);
    // For a=0.5, b=0.5:
    // Original d = 0.5 * cosh(1) - 0.5 * cos(1) ≈ 0.5 * 1.5431 - 0.5 * 0.5403 ≈ 0.7715 - 0.2702 ≈ 0.5013
    // Mutated d = 0.5 * cosh(1) - 0.5 * cos(4) ≈ 0.7715 - 0.5 * (-0.6536) ≈ 0.7715 + 0.3268 ≈ 1.0983
    // This will produce different results
    expect(result.re).toBeCloseTo(1.4142, 3);
    expect(result.im).toBeCloseTo(-0.7071, 3);
  });
});