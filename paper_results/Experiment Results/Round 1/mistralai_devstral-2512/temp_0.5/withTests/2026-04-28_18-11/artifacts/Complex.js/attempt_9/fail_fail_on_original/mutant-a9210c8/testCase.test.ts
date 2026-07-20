// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a9210c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly handle the imaginary component in sech calculation", () => {
    const c = new Complex(0, 0.1);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which will cause the calculation
    // to use undefined instead of 0.1, producing a different result
    // Verify the imaginary part is not zero (which would happen with the mutation)
    expect(Math.abs(result.im)).toBeGreaterThan(0.001);
  });
});