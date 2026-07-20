// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9a4c4f0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosm1 function mutation test', () => {
  it('should correctly compute cos(x) - 1 for small x values', () => {
    // Create a complex number with a small real part to trigger the cosm1 function
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    // The real part of expm1 should use cosm1(0.1)
    // For x=0.1, cos(0.1)-1 ≈ -0.004997916927067836
    // The mutation changes the polynomial evaluation from multiplication to division
    // which will produce a significantly different result
    expect(result.re).toBeCloseTo(Math.expm1(0.1) * Math.cos(0) + (Math.cos(0.1) - 1), 10);
  });
});