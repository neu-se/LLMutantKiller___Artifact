// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a9210c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly use the imaginary part in sech calculation", () => {
    const c = new Complex(0.1, 0.1);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which will cause the calculation
    // to use undefined instead of the actual imaginary part (0.1)
    // This should produce a significantly different result
    expect(result.re).toBeCloseTo(0.990049833749168, 10);
    expect(result.im).toBeCloseTo(-0.00995016625083199, 10);
  });
});