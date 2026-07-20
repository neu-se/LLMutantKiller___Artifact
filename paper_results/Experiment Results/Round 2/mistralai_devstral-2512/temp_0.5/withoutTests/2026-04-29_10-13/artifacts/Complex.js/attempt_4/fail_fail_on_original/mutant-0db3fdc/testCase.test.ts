// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0db3fdc/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a very small value where the Taylor series approximation should be used
    const x = 0.001;
    const expected = Math.cos(x) - 1;
    const c = new Complex(x, 0);
    const result = c.expm1();
    // The real part should be cosm1(x) which uses the Taylor series
    expect(result.re).toBeCloseTo(expected, 15);
  });
});