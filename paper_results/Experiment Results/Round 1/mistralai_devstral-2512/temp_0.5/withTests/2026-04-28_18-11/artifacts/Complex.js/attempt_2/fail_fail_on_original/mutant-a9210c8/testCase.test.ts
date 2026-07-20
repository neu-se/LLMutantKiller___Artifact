// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a9210c8/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly handle the imaginary part in sech calculation", () => {
    const c = new Complex(0, 1);
    const result = c.sech();
    // For a complex number with real=0 and im=1, sech(0+1i) should be computed correctly
    // The mutation changes this['im'] to this[""] which will break the calculation
    expect(result.re).toBeCloseTo(0.6480542736638855, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});