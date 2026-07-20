// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d732f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with real numbers", () => {
  it("should correctly multiply two real numbers using the optimization path", () => {
    const a = new Complex(2, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    // The mutant changes this['im'] to this[""] which will be undefined
    // This should cause the optimization condition to fail and produce NaN
    // when trying to multiply undefined with 0
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});