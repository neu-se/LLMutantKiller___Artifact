// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9a4c4f0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosm1 function mutation', () => {
  it('should correctly compute expm1 for purely imaginary numbers with value 0.2', () => {
    // Test with a purely imaginary number where the cosm1 function is used
    const c = new Complex(0, 0.2);
    const result = c.expm1();
    // For x=0.2i, expm1 should be: exp(0)*cos(0.2) + cosm1(0.2) + i*exp(0)*sin(0.2)
    // cosm1(0.2) ≈ -0.019966728624
    // The mutation changes the polynomial evaluation from multiplication to division
    // which will produce a different result for cosm1
    expect(result.re).toBeCloseTo(-0.019966728624, 8);
  });
});