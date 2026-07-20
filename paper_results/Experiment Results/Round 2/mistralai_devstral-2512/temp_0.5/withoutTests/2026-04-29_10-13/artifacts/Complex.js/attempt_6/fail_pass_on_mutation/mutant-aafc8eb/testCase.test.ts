// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-aafc8eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number cosm1 function', () => {
  it('should correctly compute cos(x) - 1 for x = 0.1', () => {
    const c = new Complex('0.1+0i');
    const result = c.expm1();
    // The expm1 function uses cosm1 internally
    // The mutation changes the polynomial evaluation structure which affects the result
    expect(result.re).toBeCloseTo(0.10517091807564763, 12);
    expect(result.im).toBeCloseTo(0, 12);
  });
});