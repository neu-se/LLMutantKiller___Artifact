// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f694ca0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cosm1 for values triggering Taylor series", () => {
    // Test a value that will use the Taylor series approximation
    // The mutation changes 1/40320 to 1*40320 which will significantly affect the result
    const x = 0.1; // Value within Taylor series range (-π/4 to π/4)
    const c = new Complex(0, x); // Pure imaginary number
    const result = c.expm1();
    // For small imaginary values, expm1 should be approximately (0, x + x^3/6 + x^5/120)
    // The mutation will cause a large difference in the imaginary part
    const expectedIm = x + Math.pow(x, 3)/6 + Math.pow(x, 5)/120;
    expect(result.im).toBeCloseTo(expectedIm, 8);
  });
});