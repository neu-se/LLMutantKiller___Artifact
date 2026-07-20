// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9a4c4f0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosm1 function mutation test', () => {
  it('should correctly compute cos(x) - 1 for small x values', () => {
    // Test the cosm1 function directly through expm1 which uses it
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    // For x=0.1, the correct value of cos(0.1)-1 should be approximately -0.004997916927067836
    // The mutation changes the polynomial evaluation from multiplication to division
    // which will produce a significantly different result
    const expectedRealPart = Math.expm1(0.1) * Math.cos(0) + (Math.cos(0.1) - 1);
    expect(result.re).toBeCloseTo(expectedRealPart, 10);
  });
});