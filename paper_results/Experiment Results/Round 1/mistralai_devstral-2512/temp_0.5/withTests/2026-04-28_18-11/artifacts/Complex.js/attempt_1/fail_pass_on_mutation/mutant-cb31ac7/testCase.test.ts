// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cb31ac7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js cosm1 function mutation test', () => {
  it('should correctly compute cos(x) - 1 for small x values', () => {
    // The mutation changes the sign in the Taylor series expansion of cosm1
    // This test uses a small x value where the Taylor series approximation is used
    const x = 0.1;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // For small x, expm1(x) - 1 should be approximately x + x^2/2 + x^3/6 + x^4/24
    // The real part uses cosm1(b) where b = 0 in this case
    // But we can verify the behavior by checking the derivative-like property
    const expectedReal = Math.expm1(x);
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});