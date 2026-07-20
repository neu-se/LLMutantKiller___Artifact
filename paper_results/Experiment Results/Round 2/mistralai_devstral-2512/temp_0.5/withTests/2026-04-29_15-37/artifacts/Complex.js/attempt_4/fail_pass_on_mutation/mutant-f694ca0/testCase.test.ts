// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f694ca0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cosm1 for small values", () => {
    // Directly test the cosm1 function through a complex number operation that uses it
    // The mutation changes 1/40320 to 1*40320 in the Taylor series
    const c = new Complex(0, 0.01); // Very small imaginary value
    const result = c.expm1();
    // For very small imaginary values, the result should be very close to (0, 0.010000166667)
    // The mutation will cause a significant difference in the result
    expect(result.im).toBeCloseTo(0.010000166667, 6);
  });
});