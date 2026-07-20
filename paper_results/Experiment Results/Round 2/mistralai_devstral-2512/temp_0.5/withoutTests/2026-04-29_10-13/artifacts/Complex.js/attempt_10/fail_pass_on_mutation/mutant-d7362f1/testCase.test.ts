// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should correctly multiply two real numbers and verify the optimization path", () => {
    const a = new Complex(2.5, 0);
    const b = new Complex(4, 0);
    const result = a.mul(b);
    expect(result.re).toBe(10);
    expect(result.im).toBe(0);
    // The mutant changes this['im'] to this[""] which will cause the condition to fail
    // and take the non-optimized path, potentially producing different results
  });
});