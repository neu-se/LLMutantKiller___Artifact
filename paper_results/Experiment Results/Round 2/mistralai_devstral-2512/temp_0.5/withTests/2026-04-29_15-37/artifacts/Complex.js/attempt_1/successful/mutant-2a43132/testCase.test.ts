// Test case to detect the mutation in the asec method
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec method', () => {
  it('should correctly compute asec for a non-zero complex number', () => {
    const c = new Complex(2, 3);
    const result = c.asec();
    // The mutation changes the condition from (d !== 0) to (false),
    // which would cause the method to always return the fallback case
    // (Infinity for real part, NaN for imaginary part in the mutated version)
    // For the original code, we expect a finite complex number result
    expect(result.isFinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});