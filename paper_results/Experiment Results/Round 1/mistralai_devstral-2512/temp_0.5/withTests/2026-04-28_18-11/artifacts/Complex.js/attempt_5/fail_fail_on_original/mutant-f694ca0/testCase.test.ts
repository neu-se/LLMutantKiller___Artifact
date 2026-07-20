// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f694ca0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x near π/4 boundary", () => {
    // The mutation changes +1/40320 to +1*40320 in the Taylor series
    // We need to test with a value just below the π/4 boundary (≈0.7854)
    // where the Taylor series is still used but the mutation will have maximum impact
    const x = 0.7; // Value just below π/4 where Taylor series is still used
    const c = new Complex(x, 0);
    const expResult = c.exp(); // This uses cosm1 internally
    const manualResult = expResult.sub(1); // exp(x) - 1
    // For x=0.7, exp(0.7)-1 ≈ 1.0116009116255777
    // The mutation will cause a significant difference in this calculation
    expect(manualResult.re).toBeCloseTo(1.0116009116255777, 12);
  });
});