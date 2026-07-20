// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea5746b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.expm1()', () => {
  it('should correctly compute expm1 for complex numbers with very small imaginary part triggering Taylor series', () => {
    const z = new Complex(0, 0.1);
    const result = z.expm1();
    // The mutation affects the cosm1 function which is used in expm1 calculation
    // For small imaginary parts, the Taylor series approximation should be used
    const expectedRe = Math.expm1(0) * Math.cos(0.1) + (Math.cos(0.1) - 1);
    const expectedIm = Math.exp(0) * Math.sin(0.1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});