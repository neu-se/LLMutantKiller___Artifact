// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-06b2438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asinh()', () => {
  it('should produce a valid complex number result', () => {
    const c = new Complex(1, 1);
    const result = c.asinh();
    // The mutation calls this[""]() which should return undefined
    // This will cause the result to be invalid
    expect(result).toBeInstanceOf(Complex);
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});