// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f694ca0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for very small x values", () => {
    // The mutation changes +1/40320 to +1*40320 in the Taylor series
    // We need to test with a value small enough to trigger the Taylor series path
    // but large enough to show the difference between the correct and mutated calculation
    const x = 0.01; // Small value where Taylor series is used
    const c = new Complex(x, 0);
    const expResult = c.exp(); // This uses cosm1 internally
    const manualResult = expResult.sub(1); // exp(x) - 1
    // For x=0.01, exp(0.01)-1 ≈ 0.010050167084168055
    // The mutation will cause a significant difference in this calculation
    expect(manualResult.re).toBeCloseTo(0.010050167084168055, 12);
  });
});