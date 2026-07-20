// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-103e5dc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csc()', () => {
  it('should correctly compute the cosecant of a complex number with non-zero real part', () => {
    const c = new Complex(1, 1);
    const result = c.csc();
    // The mutation changes the denominator calculation in csc()
    // Original: var d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 * a);
    // Mutated: var d = 0.5 * cosh(2 * b) - 0.5 * Math.cos(2 / a);
    // For a=1, b=1:
    // Original d = 0.5 * cosh(2) - 0.5 * cos(2) ≈ 0.5 * 3.7622 - 0.5 * (-0.4161) ≈ 1.8811 + 0.2081 ≈ 2.0892
    // Mutated d = 0.5 * cosh(2) - 0.5 * cos(2/1) = same as original in this case
    // Let's test with a value where 2*a != 2/a
    const c2 = new Complex(2, 1);
    const result2 = c2.csc();
    // For a=2, b=1:
    // Original d = 0.5 * cosh(2) - 0.5 * cos(4) ≈ 1.8811 - 0.5 * (-0.6536) ≈ 1.8811 + 0.3268 ≈ 2.2079
    // Mutated d = 0.5 * cosh(2) - 0.5 * cos(1) ≈ 1.8811 - 0.5 * 0.5403 ≈ 1.8811 - 0.2702 ≈ 1.6109
    // This will produce different results
    expect(result2.re).toBeCloseTo(0.4533, 4);
    expect(result2.im).toBeCloseTo(-0.2266, 4);
  });
});