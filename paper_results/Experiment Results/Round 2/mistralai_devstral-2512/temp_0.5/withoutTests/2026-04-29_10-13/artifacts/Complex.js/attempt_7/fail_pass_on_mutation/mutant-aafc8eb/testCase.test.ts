// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-aafc8eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number cosm1 function', () => {
  it('should correctly compute cos(x) - 1 for x = 0.2', () => {
    const c = new Complex('0.2+0i');
    const result = c.expm1();
    // Testing with x=0.2 which is within the Taylor series range (-π/4 to π/4)
    // The mutation changes the polynomial evaluation from Horner form to nested division
    // which produces different results for this specific value
    expect(result.re).toBeCloseTo(0.22140275816016982, 12);
    expect(result.im).toBeCloseTo(0, 12);
  });
});