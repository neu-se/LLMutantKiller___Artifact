// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-aafc8eb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex number cosm1 function', () => {
  it('should correctly compute cos(x) - 1 for small x values', () => {
    const c = new Complex('0.1+0i');
    const result = c.expm1();
    // The expm1 function uses cosm1 internally, and for small x values,
    // the Taylor series approximation should be accurate.
    // The mutation changes the polynomial evaluation from Horner form to a different structure,
    // which will produce different results for small x values.
    expect(result.re).toBeCloseTo(Math.expm1(0.1) * Math.cos(0) + (Math.cos(0.1) - 1), 10);
    expect(result.im).toBeCloseTo(Math.exp(0.1) * Math.sin(0), 10);
  });
});