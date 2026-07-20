// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea5746b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.expm1()', () => {
  it('should correctly compute expm1 for complex numbers with very small real part', () => {
    const z = new Complex(1e-8, 0);
    const result = z.expm1();
    const expectedRe = Math.expm1(1e-8) * Math.cos(0) + (Math.cos(0) - 1);
    const expectedIm = Math.exp(1e-8) * Math.sin(0);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});