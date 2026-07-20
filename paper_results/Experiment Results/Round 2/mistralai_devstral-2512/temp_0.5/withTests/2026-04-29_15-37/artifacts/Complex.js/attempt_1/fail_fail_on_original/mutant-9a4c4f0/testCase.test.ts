// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9a4c4f0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosm1 function mutation', () => {
  it('should correctly compute cos(x) - 1 for small x values', () => {
    // The mutation changes the polynomial evaluation from multiplication to division
    // This will cause incorrect results for small x values where the Taylor series approximation is used
    const c = new Complex('0.1+0i');
    const result = c.expm1();
    // For x=0.1, cos(0.1)-1 ≈ -0.004997916927
    // The mutation will produce a different result due to division instead of multiplication
    expect(result.re).toBeCloseTo(-0.004997916927, 10);
  });
});