// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-246ab6e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosh function', () => {
  it('should correctly compute cosh for complex numbers with non-zero imaginary part', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.cosh();
    // Expected calculation: cosh(a+bi) = cosh(a)cos(b) + i*sinh(a)sin(b)
    const expectedRe = Math.cosh(0.5) * Math.cos(0.5);
    const expectedIm = Math.sinh(0.5) * Math.sin(0.5);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});