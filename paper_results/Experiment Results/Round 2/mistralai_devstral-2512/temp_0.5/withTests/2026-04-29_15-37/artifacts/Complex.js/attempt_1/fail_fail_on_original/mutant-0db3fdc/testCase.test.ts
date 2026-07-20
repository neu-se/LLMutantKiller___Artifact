// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0db3fdc/testCase.test.ts
import { Complex } from "./complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    // The mutation changes the polynomial calculation in cosm1
    // For x=0.1, the original and mutated versions will produce different results
    // We check the real part which uses cosm1
    expect(result.re).toBeCloseTo(Math.expm1(0.1) * Math.cos(0) + (Math.cos(0.1) - 1), 10);
  });
});