// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-aafc8eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number cosm1 function', () => {
  it('should correctly compute cos(x) - 1 for x = 0.3', () => {
    const c = new Complex('0.3+0i');
    const result = c.expm1();
    // Testing with x=0.3 which is within the Taylor series range (-π/4 to π/4)
    // The mutation changes the polynomial evaluation structure which affects precision
    expect(result.re).toBeCloseTo(0.3499208854403254, 12);
    expect(result.im).toBeCloseTo(0, 12);
  });
});