// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0db3fdc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Create a complex number with small imaginary part to trigger cosm1
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    // The real part of expm1(0.1i) should be cosm1(0.1)
    // Let's verify the value is correct by comparing with direct calculation
    const expected = Math.cos(0.1) - 1;
    // Use lower precision since we're dealing with floating point approximations
    expect(result.re).toBeCloseTo(expected, 8);
  });
});