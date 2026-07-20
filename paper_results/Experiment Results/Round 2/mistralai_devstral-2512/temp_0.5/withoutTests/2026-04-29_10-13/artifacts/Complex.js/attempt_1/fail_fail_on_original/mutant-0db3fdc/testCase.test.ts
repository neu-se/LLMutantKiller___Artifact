// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0db3fdc/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a small value where the Taylor series approximation should be used
    const x = 0.1;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be cosm1(x) which uses the Taylor series
    // For x=0.1, cosm1(0.1) should be approximately -0.00499791692706784
    expect(result.re).toBeCloseTo(-0.00499791692706784, 15);
  });
});