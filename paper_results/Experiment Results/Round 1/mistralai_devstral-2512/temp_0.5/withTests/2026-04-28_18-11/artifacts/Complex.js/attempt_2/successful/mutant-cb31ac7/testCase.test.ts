// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cb31ac7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosm1 function mutation test', () => {
  it('should correctly compute cos(x) - 1 for small x values', () => {
    // The mutation changes the sign in the Taylor series expansion of cosm1
    // This test uses a small x value where the Taylor series approximation is used
    const x = 0.1;
    const c = new Complex(0, x);
    const result = c.expm1();
    // For small imaginary part x, expm1(0 + xi) should have:
    // real part = expm1(0)*cos(x) + cosm1(x) = 0 + cosm1(x)
    // The mutation changes the sign of the last term in the Taylor series
    const expectedReal = Math.cos(x) - 1;
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});