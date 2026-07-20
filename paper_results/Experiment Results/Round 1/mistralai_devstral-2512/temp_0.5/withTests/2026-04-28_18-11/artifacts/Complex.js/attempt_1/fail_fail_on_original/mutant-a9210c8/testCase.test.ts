// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a9210c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(1, 2);
    const result = c.sech();
    // Expected result calculated using the formula: sech(a + bi) = 2 / (e^(a + bi) + e^(-a - bi))
    // For a=1, b=2:
    // sech(1 + 2i) = 2 / (e^(1+2i) + e^(-1-2i))
    // The real part should be approximately 0.3141 and the imaginary part approximately -0.0834
    expect(result.re).toBeCloseTo(0.3141, 4);
    expect(result.im).toBeCloseTo(-0.0834, 4);
  });
});