// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea5746b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.expm1()', () => {
  it('should correctly compute expm1 for complex numbers with small real and imaginary parts', () => {
    const z = new Complex(0.001, 0.001);
    const result = z.expm1();
    const expectedRe = Math.expm1(0.001) * Math.cos(0.001) + (Math.cos(0.001) - 1);
    const expectedIm = Math.exp(0.001) * Math.sin(0.001);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});