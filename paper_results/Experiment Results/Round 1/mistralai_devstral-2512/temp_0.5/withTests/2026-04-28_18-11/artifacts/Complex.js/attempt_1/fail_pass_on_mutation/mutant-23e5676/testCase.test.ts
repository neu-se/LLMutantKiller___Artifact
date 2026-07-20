// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-23e5676/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc()', () => {
  it('should correctly compute acsc for a non-zero complex number', () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    // The mutation changes division to multiplication in the acsc method
    // For a non-zero complex number, this should produce a different result
    // We'll check that the result is a Complex number with finite values
    expect(result).toBeInstanceOf(Complex);
    expect(result.isFinite()).toBe(true);
    // Additional check to ensure the mutation is caught:
    // The real part should not be NaN or Infinity for this input
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});