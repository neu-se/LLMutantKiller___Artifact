// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-aafc8eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number cosm1 function', () => {
  it('should correctly compute cos(x) - 1 for very small x values', () => {
    const c = new Complex('0.001+0i');
    const result = c.expm1();
    // The expm1 function uses cosm1 internally, and for very small x values,
    // the Taylor series approximation should be extremely accurate.
    // The mutation changes the polynomial evaluation structure which affects precision
    expect(result.re).toBeCloseTo(0.0010005001667083416, 15);
    expect(result.im).toBeCloseTo(0, 15);
  });
});