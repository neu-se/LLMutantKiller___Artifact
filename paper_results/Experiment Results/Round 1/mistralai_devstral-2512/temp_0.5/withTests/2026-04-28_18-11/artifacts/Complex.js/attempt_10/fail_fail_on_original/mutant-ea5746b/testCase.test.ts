// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ea5746b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.expm1()', () => {
  it('should correctly compute expm1 for complex numbers with small imaginary part in Taylor series range', () => {
    const z = new Complex(0, Math.PI/8); // Value within Taylor series range (-π/4 ≤ x ≤ π/4)
    const result = z.expm1();
    // Direct calculation using the Taylor series formula that's affected by the mutation
    const xx = (Math.PI/8) * (Math.PI/8);
    const taylorCosm1 = xx * (
      xx * (
        xx * (
          xx * (
            xx * (
              xx / (xx * (xx / 20922789888000 - 1 / 87178291200) + 1 / 479001600)
            - 1 / 3628800)
          + 1 / 40320)
        - 1 / 720)
      + 1 / 24)
    - 1 / 2);
    const expectedRe = Math.expm1(0) * Math.cos(Math.PI/8) + taylorCosm1;
    const expectedIm = Math.exp(0) * Math.sin(Math.PI/8);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});