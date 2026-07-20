// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-d7362f1/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication optimization", () => {
  it("should use the real-number optimization path when both imaginary parts are zero", () => {
    const a = new Complex(2, 0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    expect(result.re).toBe(6);
    expect(result.im).toBe(0);
    // This test specifically targets the optimization condition
    // The mutant changes this['im'] to this[""] which will be undefined
    // causing the condition to fail and potentially producing incorrect results
    expect(result.re).toBe(6);
  });
});