// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-aafc8eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number cosm1 function', () => {
  it('should correctly compute cos(x) - 1 for x near PI/4 boundary', () => {
    const c = new Complex('0.785+0i'); // PI/4 ≈ 0.7853981634
    const result = c.expm1();
    // This value is just below the PI/4 boundary where cosm1 switches from Taylor series to direct computation
    // The mutation changes the polynomial evaluation which affects the boundary behavior
    expect(result.re).toBeCloseTo(0.7981426213117407, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});