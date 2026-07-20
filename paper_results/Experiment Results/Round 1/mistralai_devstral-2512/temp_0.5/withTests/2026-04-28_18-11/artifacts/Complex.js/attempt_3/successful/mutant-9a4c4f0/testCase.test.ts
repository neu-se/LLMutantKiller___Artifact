// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9a4c4f0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosm1 function mutation test', () => {
  it('should correctly compute expm1 for complex numbers with small imaginary parts', () => {
    // Test with a small imaginary component to trigger cosm1
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    // For purely imaginary x=0.1i, expm1 should be:
    // exp(0) * cos(0.1) - 1 + i*exp(0)*sin(0.1)
    // The real part should be cos(0.1) - 1 ≈ -0.004997916927067836
    // The mutation changes the polynomial evaluation from multiplication to division
    // which will produce a significantly different result
    expect(result.re).toBeCloseTo(Math.cos(0.1) - 1, 10);
    expect(result.im).toBeCloseTo(Math.sin(0.1), 10);
  });
});