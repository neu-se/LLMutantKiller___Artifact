// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-92423c6/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test case that directly exercises the cosm1 function through expm1
    // The mutation changes the sign of the last term in the Taylor series
    const x = 0.01; // Small value that triggers Taylor series
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The mutation affects cosm1 which is used in expm1
    // For small x, expm1(x) should be approximately x + x^2/2 + x^3/6 + x^4/24
    // With the mutation, the result will be slightly different
    expect(result.re).toBeCloseTo(Math.expm1(x), 12);
  });
});