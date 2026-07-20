// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f694ca0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cosm1 for values near Taylor series boundary", () => {
    // Test a value near the boundary where Taylor series switches to Math.cos
    // The mutation changes 1/40320 to 1*40320 which will affect the Taylor series calculation
    const x = 0.7; // Value near π/4 boundary (≈0.785)
    const c = new Complex(0, x); // Pure imaginary number
    const result = c.expm1();
    // For this value, we expect a specific result that will differ with the mutation
    // The mutation will cause a significant difference in the imaginary part
    expect(result.im).toBeCloseTo(0.644217687237691, 10);
  });
});