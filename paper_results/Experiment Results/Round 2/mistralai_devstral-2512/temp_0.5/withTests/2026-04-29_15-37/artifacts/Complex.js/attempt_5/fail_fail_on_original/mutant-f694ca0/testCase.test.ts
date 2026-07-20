// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f694ca0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cosm1 for values near π/4 boundary", () => {
    // Test at the boundary where Taylor series switches to Math.cos
    // The mutation changes 1/40320 to 1*40320 which will affect the Taylor series calculation
    const x = Math.PI/4 - 0.001; // Just below the π/4 boundary
    const c = new Complex(x, 0);
    const result = c.expm1();
    // For x near π/4, we can calculate the expected value precisely
    const expectedRe = Math.expm1(x) * Math.cos(0) + (Math.cos(x) - 1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});