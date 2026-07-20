// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f694ca0/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // The mutation changes 1 / 40320 to 1 * 40320 in the Taylor series approximation
    // This will significantly affect the result for small x values where the Taylor series is used
    const x = 0.1; // Small value that triggers Taylor series approximation
    const c = new Complex(x, 0);
    const result = c.expm1();
    // For x=0.1, the correct cos(x)-1 should be approximately -0.004997916927
    // With the mutation (1*40320 instead of 1/40320), the result will be way off
    expect(result.re).toBeCloseTo(-0.004997916927, 10);
  });
});