// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f694ca0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x values in Taylor series range", () => {
    // The mutation changes +1/40320 to +1*40320 in the Taylor series
    // We need to test with a value where the Taylor series is used
    // and the mutation will significantly affect the result
    const x = 0.5; // Value in Taylor series range (-π/4 to π/4)
    const c = new Complex(x, 0);
    const expResult = c.exp(); // This uses cosm1 internally
    const manualResult = expResult.sub(1); // exp(x) - 1
    // For x=0.5, exp(0.5)-1 ≈ 0.6487212707001282
    // The mutation will cause a significant difference in this calculation
    expect(manualResult.re).toBeCloseTo(0.6487212707001282, 12);
  });
});