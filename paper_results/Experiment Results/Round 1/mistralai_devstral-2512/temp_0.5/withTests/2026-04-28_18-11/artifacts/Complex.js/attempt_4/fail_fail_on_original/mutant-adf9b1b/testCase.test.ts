// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-adf9b1b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosm1 function mutation test', () => {
  it('should correctly compute cos(x) - 1 for very small x values', () => {
    // Test with a very small value where Taylor series approximation is used
    const x = 0.0001;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be cos(x) - 1
    // We'll compare with direct computation
    const expectedReal = Math.cos(x) - 1;
    // The mutation changes the Taylor series calculation, so we need to test
    // the actual cosm1 function indirectly through expm1
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});