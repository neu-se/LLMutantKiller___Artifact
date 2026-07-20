// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-98d178f/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.atanh', () => {
  it('should correctly compute atanh for a complex number with non-zero real and imaginary parts', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // Expected result calculated using the original implementation
    const expectedRe = 0.5 * Math.log((1 + 0.5) / (1 - 0.5));
    const expectedIm = 0.5 * Math.atan2(0.5, 1 - 0.5 * 0.5 - 0.5 * 0.5);
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expectedIm)).toBeLessThan(1e-10);
  });
});