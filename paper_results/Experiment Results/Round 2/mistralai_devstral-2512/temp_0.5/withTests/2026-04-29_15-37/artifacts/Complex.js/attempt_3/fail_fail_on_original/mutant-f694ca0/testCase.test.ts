// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-f694ca0/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute expm1 for small imaginary values", () => {
    // The mutation changes 1 / 40320 to 1 * 40320 in the Taylor series approximation
    // This affects the cosm1 function which is used in expm1 for complex numbers
    const c = new Complex(0, 0.1); // Small imaginary value
    const result = c.expm1();
    // For small imaginary values, expm1 should be approximately (0, 0.10016675001984403)
    // The mutation will cause a significant difference in the imaginary part
    expect(result.im).toBeCloseTo(0.10016675001984403, 10);
  });
});