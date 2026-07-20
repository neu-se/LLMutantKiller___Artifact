// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-adf9b1b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosm1 function mutation test', () => {
  it('should correctly compute cos(x) - 1 for small x values', () => {
    // Test with a value that triggers the Taylor series approximation
    const x = 0.1;
    const c = new Complex(0, x); // Purely imaginary number
    const result = c.expm1();
    // For purely imaginary numbers, expm1 should use cosm1 in its calculation
    // The real part should be cosm1(x)
    // The mutation changes the Taylor series calculation in cosm1
    const expectedReal = Math.cos(x) - 1;
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});