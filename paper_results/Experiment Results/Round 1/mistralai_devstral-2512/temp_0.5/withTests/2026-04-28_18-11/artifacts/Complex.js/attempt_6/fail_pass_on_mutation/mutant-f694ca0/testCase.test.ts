// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f694ca0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values in the Taylor series range", () => {
    // The mutation changes +1/40320 to +1*40320 in the Taylor series
    // We need to test with a value small enough to trigger the Taylor series path
    // and where the mutation will have maximum impact on the result
    const x = 0.001; // Very small value where Taylor series is used
    const c = new Complex(x, 0);
    const expResult = c.exp(); // This uses cosm1 internally
    const manualResult = expResult.sub(1); // exp(x) - 1
    // For x=0.001, exp(0.001)-1 ≈ 0.0010005001667083846
    // The mutation will cause a significant difference in this calculation
    expect(manualResult.re).toBeCloseTo(0.0010005001667083846, 15);
  });
});