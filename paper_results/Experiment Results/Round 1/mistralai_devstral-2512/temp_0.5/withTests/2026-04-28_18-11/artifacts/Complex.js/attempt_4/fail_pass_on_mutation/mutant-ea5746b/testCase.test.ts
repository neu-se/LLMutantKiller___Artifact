// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea5746b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.expm1()', () => {
  it('should correctly compute expm1 for very small complex numbers', () => {
    const z = new Complex(1e-10, 1e-10);
    const result = z.expm1();
    const expectedRe = Math.expm1(1e-10) * Math.cos(1e-10) + (Math.cos(1e-10) - 1);
    const expectedIm = Math.exp(1e-10) * Math.sin(1e-10);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});