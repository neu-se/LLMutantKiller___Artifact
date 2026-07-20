// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cb31ac7/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // The mutation changes the sign in the Taylor series expansion of cosm1
    // This test uses a small x value where the Taylor series approximation is used
    const x = 0.1;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // For small x, expm1(x) - 1 should be approximately x + x^2/2 + x^3/6 + x^4/24
    // The real part should be Math.expm1(x) * Math.cos(0) + cosm1(0) = Math.expm1(x) + (cos(x) - 1)
    // With the mutation, the sign change in the Taylor series will affect the result
    const expectedReal = Math.expm1(x) + (Math.cos(x) - 1);
    expect(result.re).toBeCloseTo(expectedReal, 10);
  });
});