// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7692387/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asinh() mutation test', () => {
  it('should correctly compute asinh of a complex number and maintain object state', () => {
    const c = new Complex(1, 2);
    const originalRe = c.re;
    const originalIm = c.im;
    const result = c.asinh();
    // The mutation changes this['im'] to this[""] which should break the state
    // After asinh() call, the original object should remain unchanged
    expect(c.re).toBe(originalRe);
    expect(c.im).toBe(originalIm);
    // Also verify the result is a valid complex number
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});