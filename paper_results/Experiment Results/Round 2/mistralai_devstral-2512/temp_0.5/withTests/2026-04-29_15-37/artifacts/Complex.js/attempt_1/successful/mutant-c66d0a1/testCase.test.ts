// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c66d0a1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.acsc()', () => {
  it('should correctly compute the arc cosecant of a non-zero complex number', () => {
    const c = new Complex(2, 3);
    const result = c.acsc();
    // The mutation changes the condition from (d !== 0) to (false),
    // which would cause the function to always return the fallback case
    // (Infinity for real part, -Infinity for imaginary part when d !== 0).
    // For a non-zero complex number, this should not happen.
    expect(result.isFinite()).toBe(true);
  });
});