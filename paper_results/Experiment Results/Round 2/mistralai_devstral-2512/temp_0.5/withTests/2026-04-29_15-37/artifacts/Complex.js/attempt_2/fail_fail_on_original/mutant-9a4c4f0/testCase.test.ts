// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9a4c4f0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosm1 function mutation', () => {
  it('should correctly compute cos(x) - 1 for very small x values', () => {
    // Test with a very small x value where the Taylor series approximation is used
    const x = 0.001;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // For x=0.001, cos(0.001)-1 ≈ -0.0000005
    // The mutation changes the polynomial evaluation from multiplication to division
    // which will produce a significantly different result
    expect(result.re).toBeCloseTo(-0.0000005, 6);
  });
});