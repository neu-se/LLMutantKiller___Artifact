// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0db3fdc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    // The mutation changes the polynomial calculation in cosm1
    // For x=0.1, we need to check the actual value that cosm1 produces
    // The expm1 function uses cosm1(b) where b is the imaginary part (0 in this case)
    // So we need a test that directly exercises cosm1 through a path that uses it
    // Let's use a small imaginary component to trigger cosm1
    const c2 = new Complex(0, 0.1);
    const result2 = c2.expm1();
    // The real part should be cosm1(0.1)
    // Original: cosm1(0.1) = -0.004997916927067836
    // Mutated: cosm1(0.1) will be different due to the division
    expect(result2.re).toBeCloseTo(-0.004997916927067836, 10);
  });
});