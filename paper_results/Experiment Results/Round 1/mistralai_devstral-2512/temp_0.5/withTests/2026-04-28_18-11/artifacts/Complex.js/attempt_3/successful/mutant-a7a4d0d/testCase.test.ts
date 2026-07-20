// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-a7a4d0d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.acosh()", () => {
  it("should return correct result for acosh(2)", () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    expect(result.re).toBeCloseTo(1.3169578969248166);
    expect(result.im).toBeCloseTo(0);
  });
});