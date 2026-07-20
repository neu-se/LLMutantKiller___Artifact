// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f694ca0/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // The mutation changes the term from +1/40320 to +1*40320 in the Taylor series
    // This will cause a significant difference in the result for small x values
    // where the Taylor series approximation is used
    const x = 0.1; // Small value where Taylor series is used
    const c = new Complex(x, 0);
    const result = c.expm1().re; // expm1 uses cosm1 internally
    // The expected value is based on the correct Taylor series calculation
    // For x=0.1, cos(0.1)-1 ≈ -0.004997916927067836
    expect(result).toBeCloseTo(-0.004997916927067836, 10);
  });
});